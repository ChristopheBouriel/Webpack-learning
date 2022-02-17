import $ from 'jquery'
import 'bootstrap'
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// Si on veut simplement utiliser le css
import './styles/styles.scss'

const version = '5.68.0'

$('#title').html(`Hello from Webpack ${version}`);

