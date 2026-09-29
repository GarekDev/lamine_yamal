import cv2
from pathlib import Path

src = Path("public/video/yamal.mp4")
out = Path("public/images/stats-clip")
out.mkdir(parents=True, exist_ok=True)

cap = cv2.VideoCapture(str(src))
src_fps = cap.get(cv2.CAP_PROP_FPS) or 60
start_s = 3.8
duration_s = 0.55
out_fps = 24
target_w = 1600
saved_from = 36

start_frame = int(start_s * src_fps)
end_frame = int((start_s + duration_s) * src_fps)
interval = 1 / out_fps

saved = saved_from
idx = 0
next_t = start_s

while True:
    ok, frame = cap.read()
    if not ok:
        break
    t = idx / src_fps
    if idx >= end_frame:
        break
    if t + 1e-6 >= next_t:
        h, w = frame.shape[:2]
        nh = int(h * target_w / w)
        small = cv2.resize(frame, (target_w, nh), interpolation=cv2.INTER_AREA)
        path = out / f"f{saved:03d}.jpg"
        cv2.imwrite(str(path), small, [int(cv2.IMWRITE_JPEG_QUALITY), 72])
        print(f"saved {path.name}", flush=True)
        saved += 1
        next_t += interval
    idx += 1

cap.release()
print(f"done extra through f{saved - 1:03d}.jpg", flush=True)
