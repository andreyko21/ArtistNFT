import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const paths = {
  src: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'dist'),
};

export const webpackConfig = (isMode) => {
  return {
    entry: {
      main: path.join(paths.src, 'js/main.js'),
      sign: path.join(paths.src, 'js/sign.js'),
      profile: path.join(paths.src, 'js/profile.js'),
      artsOne: path.join(paths.src, 'js/arts-one.js'),
<<<<<<< HEAD
      artsTwo: path.join(paths.src, 'js/arts-two.js'),
=======
>>>>>>> 145a3512d55c5fb94f8e08fbce6155d32ce4e93d
      school: path.join(paths.src, 'js/school.js'),
<<<<<<< HEAD
<<<<<<< HEAD
      artsTwo: path.join(paths.src, 'js/arts-two.js'),
=======
      nfts: path.join(paths.src, 'js/nfts.js'),
>>>>>>> alex-dev
=======
      users: path.join(paths.src, 'js/users.js'),
      forum: path.join(paths.src, 'js/forum.js'),
<<<<<<< HEAD
=======
>>>>>>> 2fdf4e52c7c42825146bb01fdc2a54d2c9d20437
>>>>>>> 145a3512d55c5fb94f8e08fbce6155d32ce4e93d
    },

    mode: isMode ? 'development' : 'production',

    output: {
      path: path.join(paths.build, 'js'),
      filename: '[name].min.js',
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,

          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },

          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
    devtool: isMode ? 'source-map' : 'cheap-source-map',
  };
};
