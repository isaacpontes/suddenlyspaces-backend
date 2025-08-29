import app from './app';
import { PORT } from './config/environment';

app.listen(PORT, () => console.log(`Server started successfully at http://localhost:${PORT}`));