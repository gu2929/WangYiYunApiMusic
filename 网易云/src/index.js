import dva from 'dva';
import 'antd-mobile/dist/antd-mobile.css'; 
import './style/common.scss';
import './style/flexible';
// 1. Initialize
const app = dva();
// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/likeStore').default);
app.model(require('./models/loginStore').default);
app.model(require('./models/peopleVideoStore').default);
app.model(require('./models/searchStore').default);
app.model(require('./models/playSongStore').default);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
