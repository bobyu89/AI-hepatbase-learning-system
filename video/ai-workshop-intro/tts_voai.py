"""用 VoAI 合成旁白：讀 lines.json，輸出 voice/<id>.wav 與 voice/dur.json。

用法：
    VOAI_KEY=你的金鑰 python tts_voai.py

金鑰只從環境變數讀取，不要寫進任何檔案或提交到 repo。
聲音與模型在下面的 SPEAKER、VERSION 修改。
"""
import json, os, subprocess, sys, urllib.request

SPEAKER = "渝函"
VERSION = "Neo"
URL = "https://connect.voai.ai/TTS/Speech"

key = os.environ.get("VOAI_KEY")
if not key:
    sys.exit("請先設定環境變數 VOAI_KEY")

os.makedirs("voice", exist_ok=True)
dur = {}
for line in json.load(open("lines.json", encoding="utf-8")):
    body = json.dumps(
        {"version": VERSION, "text": line["text"], "speaker": SPEAKER, "style": "預設",
         "speed": 1, "pitch_shift": 0, "style_weight": 0, "breath_pause": 0}
    ).encode()
    req = urllib.request.Request(
        URL, data=body, headers={"x-api-key": key, "x-output-format": "wav", "Content-Type": "application/json"}
    )
    raw, out = f"voice/{line['id']}.raw.wav", f"voice/{line['id']}.wav"
    with open(raw, "wb") as f:
        f.write(urllib.request.urlopen(req, timeout=90).read())
    # 去掉頭尾的靜音，時間軸才排得緊
    trim = "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", raw, "-af", trim, "-ar", "44100", "-ac", "1", out], check=True)
    os.remove(raw)
    seconds = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out], capture_output=True, text=True
    ).stdout
    dur[line["id"]] = round(float(seconds), 3)
    print(line["id"], dur[line["id"]])
json.dump(dur, open("voice/dur.json", "w"), indent=1)
print("total", round(sum(dur.values()), 2))
