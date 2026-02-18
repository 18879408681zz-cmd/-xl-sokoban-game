@echo off
echo 正在启动推箱子游戏本地服务器...
echo.
echo 请在手机上使用浏览器访问以下地址：
echo.
echo 1. 确保手机和电脑连接同一个Wi-Fi网络
echo 2. 在手机浏览器中输入：http://[你的电脑IP地址]:8000
echo 3. 如何查找电脑IP地址：
echo    - 按 Win+R 输入 cmd 回车
echo    - 输入 ipconfig 回车
echo    - 找到"无线局域网适配器 WLAN"下的IPv4地址
echo.
echo 按任意键启动服务器...
pause >nul

python -m http.server 8000