const path = require('path');

module.exports = {
	entry: {
		antd:'./src/index.js'
		},
	devtool: 'inline-source-map',
	devServer:{
		contentBase:'./dist'
	},
	output: {
		filename:'[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:[
					'style-loader',
					'css-loader'
				]
			},
			{
      			test: /\.(js|jsx)$/,
      			exclude: /(node_modules|bower_components)/,
      			include: path.app,
      			use: {
        			loader: 'babel-loader',
        			options: {
          				//presets: ['@babel/preset-env'],
          				
          				plugins: [
    						["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] 
  						]
  						
        			}
      			}
    		}
		]
	}
};