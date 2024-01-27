 
import './App.css';
import CameraCapture from './components/CameraCapture';
import ImageUploader from './components/ImageUploader';

function App() {
  return (
    <div className="App">
     <ImageUploader/>
     <CameraCapture/>
    </div>
  );
}

export default App;
