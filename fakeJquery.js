class ElementCollection extends Array {
  ready(cb) {
    const isReady = this.some(e => {
        return e.readyState != null && e.readyState != 'loading';
    });
    if (isReady) {
      cb();
    } else {
      this.on('DOMContentLoaded', cb);
    }
  }

  on(event, cbOrSelector, cb) {
    if (typeof cbOrSelector === 'function') {
      this.forEach(e => e.addEventListener(event, cbOrSelector));
    } else {
      this.forEach(elem => {
        elem.addEventListener(event, e => {
          if (e.target.matches(cbOrSelector)) cb(e);
        })
      });
    }
  }

  next() {
    return this.map(e => e.nextElementSibling).filter(e => e != null);
  }
  
  prev() {
    return this.map(e => e.previousElementSibling).filter(e => e != null);
  }

  removeClass() {

  }

  addClass() {
    
  }
}

function $(param) {
  if (typeof param === 'string' || param instanceof String) {
    return new ElementCollection(...document.querySelectorAll(param));
  } else {
    return new ElementCollection(param);
  }
}