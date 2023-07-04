const options = {
  name: 'Black Hole',
  particles: {
    number: {
      value: 1000,
      density: {
        enable: true,
      },
    },
    color: {
      value: ['#ffffff', '#77ccff', '#ff3333', '#ffff33'],
    },
    shape: {
      type: 'circle',
    },
    opacity: {
      value: 1,
    },
    size: {
      value: {
        min: 1,
        max: 10,
      },
    },
    links: {
      enable: false,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.5,
      warp: true,
    },
  },
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
    },
    modes: {
      push: {
        quantity: 4,
      },
    },
  },
  absorbers: {
    orbits: true,
    destroy: false,
    size: {
      value: 5,
      limit: 50,
      density: 1500,
    },
    position: {
      x: 50,
      y: 50,
    },
  },
  background: {
    color: '#000',
    image: '',
    position: '50% 50%',
    repeat: 'no-repeat',
    size: 'cover',
  },
};

export default options;

export const part1Opt = {
  background: {
    color: {
      value: '#0d47a1',
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
      onHover: {
        enable: true,
        mode: 'repulse',
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#ffffff',
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce',
      },
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};

export const charOpt = {
  name: 'Chars',
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    color: {
      value: '#ff0000',
    },
    stroke: {
      width: 1,
      color: '#ffffff',
    },
    shape: {
      type: 'char',
      options: {
        char: [
          {
            value: ['t', 's', 'P', 'a', 'r', 't', 'i', 'c', 'l', 'e', 's'],
            font: 'Verdana',
            style: '',
            weight: '400',
            fill: true,
          },
          {
            value: ['t', 's', 'P', 'a', 'r', 't', 'i', 'c', 'l', 'e', 's'],
            font: 'Verdana',
            style: '',
            weight: '400',
            fill: false,
          },
        ],
      },
    },
    opacity: {
      value: {
        min: 0.1,
        max: 0.5,
      },
      animation: {
        enable: true,
        speed: 1,
      },
    },
    size: {
      value: 16,
    },
    links: {
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: 'repulse',
        parallax: {
          enable: false,
          force: 60,
          smooth: 10,
        },
      },
      onClick: {
        enable: true,
        mode: 'push',
      },
    },
    modes: {
      grab: {
        distance: 400,
        links: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 0.8,
      },
      repulse: {
        distance: 200,
      },
      push: {
        quantity: 4,
      },
      remove: {
        quantity: 2,
      },
    },
  },
  background: {
    color: '#0d47a1',
  },
};
