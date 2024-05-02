const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

const mainRoutes = require('./routes/mainRoutes');
app.use('/', mainRoutes);

// Server initialization
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));