import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {connect} from 'react-redux';
class SimpleSlider extends React.Component{
   state = {
   value: 0,
  }
  onSliderChange = (value) => {
   this.setState({value:value});
  }
   componentDidMount(){
     this.props.setV({
      set:(value)=>{this.setState({value})}
   })
   /*setInterval(()=>{
    this.setState({value:this.state.value+0.1});
   },100)*/
  }
  onAfterChange = (value) => {
    let{audio,id}=this.props
    let val = parseFloat(value);
    let percentage = (val / 100);
    let currentTime = percentage * audio.duration(id);
    audio.seek(currentTime, id);
  }

  render() {
    console.log('Rendered')
    return (
      <Slider value={this.state.value}
        onChange={this.onSliderChange} 
        onAfterChange={this.onAfterChange}
        trackStyle={{
           backgroundColor:'rgb(29, 185, 84)'
        }}
        handleStyle={{
          border:'none',
          backgroundColor:'rgb(29, 185, 84)',
          boxShadow:'none',
          cursor:'pointer'
        }}
        step={0.1}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
  audio: state.audio.audio,
  id:state.audio.id,
 }
}  
export default connect(mapStateToProps,null)(SimpleSlider);