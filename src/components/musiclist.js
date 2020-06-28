import React, { Component } from "react";
import { connect } from 'react-redux';
import Loader from './loader'
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { loadsongs, loadsongsnew } from '../actions/index'
import MusicItem from './musicitem'

class list extends Component {
  query = null

  componentWillMount() {
    const params = new URLSearchParams(this.props.location.search);
    this.query = params.get('q');
    this.props.loadsongsnew({ query: this.query, offset: 0 })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const params = new URLSearchParams(nextProps.location.search);
      this.query = params.get('q');
      this.props.loadsongsnew({ query: this.query, offset: 0 })
    }
  }

  componentWillUnmount() {
  }

  fetchMoreData = () => {
    this.props.loadsongs({ query: this.query, offset: this.props.offset - 1 })
  }

  render() {
    let hasmore = this.props.offset < this.props.count ? true : false
    return (
      <React.Fragment>
        {this.props.loading && <Loader />}
        {this.props.tracks.length !== 0 && !this.props.loading &&
          <InfiniteScroll
            dataLength={this.props.tracks.length}
            next={this.fetchMoreData}
            height={'75.5vh'}
            hasMore={hasmore}
          >
            <div className="container" style={{ 'marginBottom': '9em', 'marginTop': '2em' }}>
              <ul className="tracklist">
                {this.props.tracks.map(function (item, index) {
                  return <MusicItem index={index + ''} key={index} data={item} />
                })}
              </ul>
            </div>
          </InfiniteScroll>}
        {this.props.tracks.length === 0 && !this.props.loading && <h4 style={{ 'color': 'white', 'width': 'max-content', 'margin': '2em auto' }}> No Result Found </h4>}
      </React.Fragment>
    )
  }
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
export default connect(mapStateToProps, mapDispatchToProps)(list);