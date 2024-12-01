import loader from '../../Helpers/Loading/loading_gif.gif';
import './loading.css';

export const Loading = () => {
  return (
    <div className='loaderGif'>
    <img src={loader} alt=""/>
  </div>
  )
}
