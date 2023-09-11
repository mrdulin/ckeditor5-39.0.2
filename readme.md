# ckeditor

测试图片上传

启动图片上传服务

```bash
cd server
npm start
```

启动客户都HTTP server

```bash
cd client
npm run serve
```

HTTP server启动日志

```bash
> http-server ./

Starting up http-server, serving ./

http-server version: 14.1.1

http-server settings:
CORS: disabled
Cache: 3600 seconds
Connection Timeout: 120 seconds
Directory Listings: visible
AutoIndex: visible
Serve GZIP Files: false
Serve Brotli Files: false
Default File Extension: none

Available on:
  http://127.0.0.1:8080
  http://172.30.189.223:8080
Hit CTRL-C to stop the server
```

记录IP 172.30.189.223和端口8080

WSL中启动客户端HTTP server在局域网无法访问问题，参考 <https://stackoverflow.com/questions/61002681/connecting-to-wsl2-server-via-local-network>

```ps
PS C:\WINDOWS\system32> netsh advfirewall firewall add rule name="Allowing LAN connections" dir=in action=allow protocol=TCP localport=8080
确定。
```

```ps
PS C:\WINDOWS\system32> netsh interface portproxy add v4tov4 listenport=8080 listenaddress=0.0.0.0 connectport=8080 connectaddress=172.30.189.223
```

同时还需要设置图片上传服务可以被局域网访问，图片上传服务的端口为`5000`

```ps
PS C:\WINDOWS\system32> netsh interface portproxy add v4tov4 listenport=5000 listenaddress=0.0.0.0 connectport=5000 connectaddress=172.30.189.223
```

找到局域网IP

```ps
PS C:\WINDOWS\system32> ipconfig

Windows IP 配置


以太网适配器 以太网:

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::3277:7f7d:9677:9720%8
   IPv4 地址 . . . . . . . . . . . . : 192.168.10.197
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . : 192.168.10.1

以太网适配器 vEthernet (WSL):

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::a922:c592:eba1:4e25%17
   IPv4 地址 . . . . . . . . . . . . : 172.30.176.1
   子网掩码  . . . . . . . . . . . . : 255.255.240.0
   默认网关. . . . . . . . . . . . . :
```

在window浏览器中访问: `http://192.168.10.197:8080`进行测试
