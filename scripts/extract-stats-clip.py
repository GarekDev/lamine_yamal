import cv2
from pathlib import Path

src = Path("public/video/yamal.mp4")
out = Path("public/images/stats-clip")
out.mkdir(parents=True, exist_ok=True)

cap = cv2.VideoCapture(str(src))
src_fps = cap.get(cv2.CAP_PROP_FPS) or 60
start_s = 2.0
duration_s = 1.97
out_fps = 24
target_w = 1600

start_frame = int(start_s * src_fps)
end_frame = int((start_s + duration_s) * src_fps)
step = max(1, round(src_fps / out_fps))

saved = 0
idx = 0
while True:
    ok, frame = cap.read()
    if not ok:
        break
    if idx >= end_frame:
        break
    if idx >= start_frame and (idx - start_frame) % step == 0:
        h, w = frame.shape[:2]
        nh = int(h * target_w / w)
        small = cv2.resize(frame, (target_w, nh), interpolation=cv2.INTER_AREA)
        path = out / f"f{saved:03d}.jpg"
        cv2.imwrite(str(path), small, [int(cv2.IMWRITE_JPEG_QUALITY), 72])
        saved += 1
        print(f"saved {path.name}", flush=True)
    idx += 1

cap.release()
print(f"done {saved} frames", flush=True)
