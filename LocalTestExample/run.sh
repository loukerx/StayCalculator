#!/bin/bash
# 打开 index.html 并自动填入测试数据
#
# 测试数据:
#   签证最晚入境日期: 2027-07-01
#   历史出入境记录:
#     2024-10-15 ~ 2025-01-12 (90天)
#     2025-04-13 ~ 2025-09-21 (162天)
#   本次入境日期: 2026-03-06

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR/.."
DIST_DIR="$PROJECT_DIR/dist"
PORT=8558

# 检查端口是否已被占用，如果是则先关闭
lsof -ti:$PORT >/dev/null 2>&1 && kill $(lsof -ti:$PORT) 2>/dev/null

# 构建仅包含公开站点文件的产物目录
python3 "$PROJECT_DIR/scripts/build_site.py"

# 启动禁用缓存的 HTTP 服务器（后台运行）
python3 "$SCRIPT_DIR/no_cache_server.py" "$PORT" "$DIST_DIR" &>/dev/null &
SERVER_PID=$!

# 等待服务器启动
sleep 0.5

PARAMS="lastArrival=2027-07-01"
PARAMS+="&trips=2024-10-15,2025-01-12;2025-04-13,2025-09-21"
PARAMS+="&currentEntry=2026-03-06"
PARAMS+="&lang=zh"
PARAMS+="&auto=1"
PARAMS+="&cb=$(date +%s)"

open "http://localhost:$PORT/index.html?$PARAMS"

echo "Server running on http://localhost:$PORT (PID: $SERVER_PID)"
echo "Press Ctrl+C to stop the server"

# 捕获 Ctrl+C 停止服务器
trap "kill $SERVER_PID 2>/dev/null; echo 'Server stopped.'; exit 0" INT
wait $SERVER_PID
