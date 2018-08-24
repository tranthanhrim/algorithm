var handler = {
  get (target, key) {
    invariant(key, 'get')
    return target[key]
  },
  set (target, key, value, receiver) {
    console.log('receiver: ', receiver);
    target[key] = value;
    return false;
  }
}
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`)
  }
}
var target = {}
var proxy = new Proxy(target, handler)
proxy.a = 'b';
console.log(proxy.a);
proxy._prop = 'c'