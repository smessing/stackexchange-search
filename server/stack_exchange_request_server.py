import tornado.ioloop
import tornado.web


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        url = self.get_argument('url')
        self.set_header('Access-Control-Allow-Origin', '*')
        self.write(url)
        self.finish()

app = tornado.web.Application([
    (r'/', MainHandler),
])

if __name__ == '__main__':
    app.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
