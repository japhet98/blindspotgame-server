import createError from 'http-errors';
import express,{Request,Response,NextFunction,ErrorRequestHandler} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import DBConfiguration from './config/db.config';
import cors from 'cors';
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,x-access-token,Content-Type, Accept"
  );
  res.header("Access-Controll-Allow-Credentials", String(true));
  next();
});

DBConfiguration.connectDB();

app.use('/', indexRouter);
app.use('/users', usersRouter);

require("./Common/bundleRout")(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function (err: { message: any; status: any; }, req: Request, res: Response, next: NextFunction) {
  res.status(err.status || 500).json({ ...err });

});

export default app;
