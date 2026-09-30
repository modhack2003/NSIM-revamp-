import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mocks = vi.hoisted(() => ({
  params: new URLSearchParams(),
  success: vi.fn(),
  error: vi.fn(),
  submit: vi.fn(),
}));

vi.mock('next/navigation', () => ({ useSearchParams: () => mocks.params }));
vi.mock('sonner', () => ({ toast: { success: mocks.success, error: mocks.error } }));
vi.mock('@/lib/submit-enquiry', () => ({ submitEnquiry: mocks.submit }));

import { ContactForm } from '@/components/sections/contact-form';

const options = [
  { value: 'ai-digital-marketing', label: 'Digital Marketing' },
  { value: 'business-accounting-finance', label: 'Accounting & Finance' },
  { value: 'ai-prompt-engineering', label: 'Prompt Engineering' },
  { value: 'not-sure', label: 'Not sure yet — help me choose' },
];

const field = (name: RegExp) => screen.getByLabelText(name);
const select = () => screen.getByLabelText(/Program of interest/) as HTMLSelectElement;

async function fillValid(user: ReturnType<typeof userEvent.setup>, { course = true } = {}) {
  await user.type(field(/Full name/), 'Priya Mehta');
  await user.type(screen.getByRole('textbox', { name: /^Email/ }), 'priya@example.com');
  await user.type(field(/Mobile number/), '98765 43210');
  if (course) await user.selectOptions(select(), 'ai-digital-marketing');
  await user.click(screen.getByLabelText(/I agree to be contacted/));
}

const submit = (user: ReturnType<typeof userEvent.setup>) => user.click(screen.getByRole('button', { name: /Send enquiry/ }));

describe('ContactForm', () => {
  beforeEach(() => {
    mocks.params = new URLSearchParams();
    mocks.success.mockReset();
    mocks.error.mockReset();
    mocks.submit.mockReset();
    mocks.submit.mockResolvedValue({ ok: true });
  });

  it('shows the 5 required errors on empty submit and focuses name', async () => {
    const user = userEvent.setup();
    render(<ContactForm courseOptions={options} />);
    await submit(user);
    await waitFor(() => expect(screen.getByText('Please enter your full name')).toBeInTheDocument());
    for (const msg of [
      'Enter a valid email address',
      'Enter a valid 10-digit Indian mobile number',
      'Choose a program',
      'Please agree to be contacted',
    ])
      expect(screen.getByText(msg)).toBeInTheDocument();
    expect(field(/Full name/)).toHaveFocus();
    expect(field(/Full name/)).toHaveAttribute('aria-invalid', 'true');
    expect(field(/Full name/)).toHaveAttribute('aria-describedby', 'name-error');
    expect(screen.getByTestId('form-summary').textContent).toBe('Please fix 5 highlighted fields');
    expect(mocks.submit).not.toHaveBeenCalled();
  });

  it('submits a valid enquiry, toasts and resets', async () => {
    const user = userEvent.setup();
    render(<ContactForm courseOptions={options} />);
    await fillValid(user);
    await submit(user);
    await waitFor(() => expect(mocks.success).toHaveBeenCalledWith('Thanks, Priya! A counsellor will reach out within 24 hours.'));
    expect(mocks.submit).toHaveBeenCalledWith(expect.objectContaining({ phone: '+919876543210', course: 'ai-digital-marketing' }));
    expect(field(/Full name/)).toHaveValue('');
    expect(select().value).toBe('');
  });

  it('skips submitEnquiry when the honeypot is filled but still succeeds', async () => {
    const user = userEvent.setup();
    const { container } = render(<ContactForm courseOptions={options} />);
    await fillValid(user);
    await user.type(container.querySelector('#hp_ref')!, 'bot');
    await submit(user);
    await waitFor(() => expect(mocks.success).toHaveBeenCalled());
    expect(mocks.submit).not.toHaveBeenCalled();
  });

  it('keeps values and toasts an error when submission rejects', async () => {
    mocks.submit.mockRejectedValue(new Error('boom'));
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const user = userEvent.setup();
    render(<ContactForm courseOptions={options} />);
    await fillValid(user);
    await submit(user);
    await waitFor(() => expect(mocks.error).toHaveBeenCalled());
    expect(mocks.success).not.toHaveBeenCalled();
    expect(field(/Full name/)).toHaveValue('Priya Mehta');
    expect(screen.getByRole('button', { name: /Send enquiry/ })).toBeEnabled();
    spy.mockRestore();
  });

  it('preselects the course from ?course=', async () => {
    mocks.params = new URLSearchParams('course=ai-prompt-engineering');
    render(<ContactForm courseOptions={options} />);
    await waitFor(() => expect(select().value).toBe('ai-prompt-engineering'));
  });

  it('ignores an invalid ?course= value', async () => {
    mocks.params = new URLSearchParams('course=bogus');
    render(<ContactForm courseOptions={options} />);
    await new Promise((r) => setTimeout(r, 20));
    expect(select().value).toBe('');
  });

  it('does not re-apply the preselect after reset', async () => {
    mocks.params = new URLSearchParams('course=ai-prompt-engineering');
    const user = userEvent.setup();
    render(<ContactForm courseOptions={options} />);
    await waitFor(() => expect(select().value).toBe('ai-prompt-engineering'));
    await fillValid(user, { course: false });
    await submit(user);
    await waitFor(() => expect(mocks.success).toHaveBeenCalled());
    expect(mocks.submit).toHaveBeenCalledWith(expect.objectContaining({ course: 'ai-prompt-engineering' }));
    await new Promise((r) => setTimeout(r, 20));
    expect(select().value).toBe('');
    expect(select().selectedOptions[0].textContent).toBe('Select a program');
  });
});
