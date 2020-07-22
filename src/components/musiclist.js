import React, { useEffect,memo } from "react";
import { connect } from 'react-redux';
import Loader from './loader'
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { loadsongs, loadsongsnew } from '../actions/index'
import MusicItem from './musicitem'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   root: {
    width:'100%',
    marginBottom: '9em', 
    marginTop: '2em',
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    }
   },
   result:{ 
   color: 'white',
   width: 'max-content', 
   margin: '2em auto'
  }  
}));

const MusicList= props=> {
  
  const classes = useStyles();
  
  let query=null
  
  useEffect(
    () => {
      const params = new URLSearchParams(props.location.search);
      query = params.get('q');
      props.loadsongsnew({ query:query, offset: 0 })
    },
    [props.location.search],
  );
  
  const fetchMoreData = () => {
    props.loadsongs({ query: query, offset: props.offset - 1 })
  }

  let hasmore = props.offset < props.count ? true : false
  return (
      <React.Fragment>
        {props.loading && <Loader />}
        {props.tracks.length !== 0 && !props.loading &&
          <InfiniteScroll
            dataLength={props.tracks.length}
            next={fetchMoreData}
            height={'75.5vh'}
            hasMore={hasmore}
          >
          <Container  classes={{root: classes.root}}>
              <ul className="tracklist">
                {props.tracks.map(function (item, index) {
                  return <MusicItem index={index + ''} key={index} data={item} />
                })}
              </ul>
              </Container>
          </InfiniteScroll>}
        {props.tracks.length === 0 && !props.loading && <h1 className={classes.result}> No Result Found </h1>}
      </React.Fragment>
  )
  }

const mapStateToProps = (state) => {
  return {
    loading: state.audiolist.loading,
    tracks: state.audiolist.tracks,
    query: state.audiolist.query,
    offset: state.audiolist.offset,
    count: state.audiolist.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadsongs,
    loadsongsnew
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(memo(MusicList));