export default function () {
  const PROTOCAL = 'http';
  // use when run with docker
  // const HOST = 'host.docker.internal';
  const HOST = '127.0.0.1';
  const PORT = '3001';
  const PATH = 'health';
  const URL = `${PROTOCAL}://${HOST}:${PORT}/${PATH}`;
  const res = http.get(URL, { timeout: '120s' });

  check(res, {
    '200': (r) => {
      if (r.status !== 200) {
        console.log(r);
      }
      return r.status === 200;
    },
  });

  sleep(1);
}
