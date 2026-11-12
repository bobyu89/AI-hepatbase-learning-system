# 讓 edge-tts 信任這個環境的代理憑證（不關閉憑證驗證），再執行 lemo 的 tts_zh.py
import sys, runpy, certifi
certifi.where = lambda: "/root/.ccr/ca-bundle.crt"
sys.argv = sys.argv[1:]
runpy.run_path(sys.argv[0], run_name="__main__")
