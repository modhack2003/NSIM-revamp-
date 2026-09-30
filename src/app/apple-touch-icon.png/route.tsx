import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #6d3ef0, #e0368f 55%, #e08a1e)',
          color: '#ffffff',
          fontSize: 112,
          fontWeight: 800,
        }}
      >
        N
      </div>
    ),
    { width: 180, height: 180 },
  );
}
