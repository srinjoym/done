const {menubar} = require("menubar");

const mb = menubar({
  index: 'http://localhost:3000'
});

mb.on('ready', () => {
  console.log('app is ready');
  // your app code here
});

