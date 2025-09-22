import React, { useRef, useEffect } from 'react';
import './Loading.css';
import loadingVideo from './TrendLoadingHd-greenscreen.mp4'; // place loading.mp4 next to this file (or adjust path)

const Loading = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    const c = canvasRef.current;
    if (!v || !c) return;
    const ctx = c.getContext('2d');
    let raf;

    function render() {
      if (v.readyState >= 2) {
        // draw at small fixed size for performance; adjust as needed
        const W = 200, H = 200;
        if (c.width !== W || c.height !== H) {
          c.width = W; c.height = H;
        }
        ctx.drawImage(v, 0, 0, W, H);
        const img = ctx.getImageData(0, 0, W, H);
        const d = img.data;
        // simple chroma key: remove pixels that are strongly green
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          // tunable thresholds
          if (g > 120 && g > r * 1.2 && g > b * 1.2 && (g - Math.max(r, b)) > 30) {
            d[i + 3] = 0; // make transparent
          }
        }
        ctx.putImageData(img, 0, 0);
      }
      raf = requestAnimationFrame(render);
    }

    v.play().catch(() => {}); // ensure autoplay (muted)
    render();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      {/* Hidden source video (muted so autoplay allowed) */}
      <video
        ref={videoRef}
        src={loadingVideo}
        autoPlay
        muted
        loop
        playsInline
        style={{ display: 'none' }}
      />
      {/* Canvas shows chroma keyed result */}
      <canvas
        ref={canvasRef}
        aria-label="Loading animation"
        style={{ width: '100px', height: '100px', background: 'transparent' }}
      />
    </div>
  );
};

export default Loading;