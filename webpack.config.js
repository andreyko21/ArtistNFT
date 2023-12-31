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
      messages: path.join(paths.src, 'js/messages.js'),
      artsOne: path.join(paths.src, 'js/arts-one.js'),
      artsTwo: path.join(paths.src, 'js/arts-two.js'),
      school: path.join(paths.src, 'js/school.js'),
      nfts: path.join(paths.src, 'js/nfts.js'),
      users: path.join(paths.src, 'js/users.js'),
      forum: path.join(paths.src, 'js/forum.js'),
      productArts: path.join(paths.src, 'js/productArts.js'),
      payment: path.join(paths.src, 'js/payment.js'),
      auction: path.join(paths.src, 'js/auction.js'),
      profileNftOrders: path.join(paths.src, 'js/profileNftOrders.js'),
      orders: path.join(paths.src, 'js/orders.js'),
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
