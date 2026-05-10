#!/usr/bin/env python3
import http.server, socketserver, os

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='/root/invictus-mockup', **kwargs)

PORT = 8080
socketserver.TCPServer.allow_reuse_address = True
# Threading allows the server to stay alive while handling requests
class ThreadedHTTPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True

server = ThreadedHTTPServer(('', PORT), Handler)
print(f'Serving on port {PORT}', flush=True)
server.serve_forever()