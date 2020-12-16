const config = require('../config');
import App from '../';
const app = App();

app.listen(config.PORT, () => console.log(`Server listening on port ${config.PORT}`));
