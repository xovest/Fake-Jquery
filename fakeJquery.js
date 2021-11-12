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
    return this;
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
    return this;
  }

  next() {
    return this.map(e => e.nextElementSibling).filter(e => e != null);
  }
  
  prev() {
    return this.map(e => e.previousElementSibling).filter(e => e != null);
  }

  removeClass(className) {
    this.forEach(e => e.classList.remove(className));
    return this;
  }
  
  addClass(className) {
    this.forEach(e => e.classList.add(className));
    return this;
  }

  css(property, value) {
    const camelProp = property.replace(/(-[a-z])/, g => {
      return g.replace('-', '').toUpperCase();
    });
    this.forEach(e => e.style[camelProp] = value);
    return this;
  }
}

function $(param) {
  if (typeof param === 'string' || param instanceof String) {
    return new ElementCollection(...document.querySelectorAll(param));
  } else {
    return new ElementCollection(param);
  }
}