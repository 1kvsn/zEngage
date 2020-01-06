import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { getOrganisationsList } from '../actions/Action';

class OrganizationList extends Component {

  componentDidMount = () => {
    this.props.dispatch(getOrganisationsList());
  }

  render() {
    const { organisations } = this.props;
    const orgList = organisations.list;

    return (
      <>
        <div className='org-list-container'>
          <h3>Active Organisations</h3>
          {
            !orgList.length ? <p>There are no organisations to show.</p> : null
          }
          <div className="org-card-container" >
            {
              orgList && orgList.map((elm, i) => {
                return (
                  <Card className="orgCard" key={i}>
                    <CardActionArea>
                      <CardContent style={{ padding: '5px', textAlign: 'center' }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          <Link to={`/users/org/${elm._id}`}>
                            <div>{elm.name}</div>
                          </Link>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  
                )
              })
            }
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    organisations: state.organisations
  }
}

export default connect(mapStateToProps)(OrganizationList);