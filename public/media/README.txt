Drop media here — the homepage picks files up by name (no code changes).
Restart `npm run dev` (or rebuild) after adding files.

hero/
  reel.mp4            Full-screen reel behind the homepage (muted, loops). 1920x1080+, H.264, ideally < 15 MB.
  reel.jpg            Optional poster frame shown while the video loads.

work/                 One tile per project, 3:2 landscape (e.g. 1600x1067). Video (.mp4) wins over image.
  fr.jpg  svp.jpg  franch.jpg                         (core services)
  strategy.jpg  operations.jpg  people.jpg
  expansion.jpg  store-development.jpg  analytics.jpg  (areas of expertise)
  methodology.jpg
  <slug>-logo.svg     Optional logo shown on the cyan hover veil.

clients/              Client logos for the grey band (SVG preferred, dark on transparent).
                      Shown in name order — prefix 01-, 02- … to set the order.
                      While this folder is empty the band shows the industries we serve.
