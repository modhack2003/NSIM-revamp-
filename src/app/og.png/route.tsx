import { ImageResponse } from 'next/og';
import { siteConfig } from '@/data/site';

export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#0b0c17',
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(124,77,255,0.55), transparent 45%), radial-gradient(circle at 85% 25%, rgba(56,200,230,0.45), transparent 40%), radial-gradient(circle at 60% 95%, rgba(236,72,153,0.45), transparent 45%)',
          color: '#f5f5fa',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #6d3ef0, #e0368f 55%, #e08a1e)',
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            N
          </div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2, maxWidth: 980 }}>
            Build a career in AI-powered skills.
          </div>
          <div style={{ fontSize: 32, color: 'rgba(245,245,250,0.78)' }}>
            Digital Marketing · Accounting &amp; GST · Prompt Engineering — live online from Kolkata
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
