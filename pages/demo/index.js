import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
} from 'reactstrap';
import cl from 'classnames';
import { ChevronRight, Calendar } from 'react-feather';
import React, { Component } from 'react';

import Active from '../../components/presentationals/icons/Active';
import Add from '../../components/presentationals/icons/Add';
import AddMini from '../../components/presentationals/icons/AddMini';
import All from '../../components/presentationals/icons/All';
import ArrowIcon from '../../components/presentationals/icons/ArrowIcon';
import CalendarCreatedIcon from '../../components/presentationals/icons/CalendarCreatedIcon';
import CalendarIcon from '../../components/presentationals/icons/CalendarIcon';
import Checkmark from '../../components/presentationals/icons/Checkmark';
import ChevronLeftIcon from '../../components/presentationals/icons/ChevronLeftIcon';
import ChevronRightIcon from '../../components/presentationals/icons/ChevronRightIcon';
import CircleCheckmarkIcon from '../../components/presentationals/icons/CircleCheckmarkIcon';
import CircleExclamationIcon from '../../components/presentationals/icons/CircleExclamationIcon';
import CircleIcon from '../../components/presentationals/icons/CircleIcon';
import ClipboardIcon from '../../components/presentationals/icons/ClipboardIcon';
import ClockIcon from '../../components/presentationals/icons/ClockIcon';
import Close from '../../components/presentationals/icons/Close';
import CommentIcon from '../../components/presentationals/icons/CommentIcon';
import Completed from '../../components/presentationals/icons/Completed';
import DetailNotAvailableIcon from '../../components/presentationals/icons/DetailNotAvailableIcon';
import DiskIcon from '../../components/presentationals/icons/DiskIcon';
import Disk from '../../components/presentationals/icons/Disk';
import DotsMini from '../../components/presentationals/icons/DotsMini';
import Download from '../../components/presentationals/icons/Download';
import DownloadSmall from '../../components/presentationals/icons/DownloadSmall';
import DownloadThickIcon from '../../components/presentationals/icons/DownloadThickIcon';
import Edit from '../../components/presentationals/icons/Edit';
import ErrorIcon from '../../components/presentationals/icons/ErrorIcon';
import ETA from '../../components/presentationals/icons/ETA';
import FeedIcon from '../../components/presentationals/icons/FeedIcon';
import File from '../../components/presentationals/icons/File';
import Files from '../../components/presentationals/icons/Files';
import FolderClosedOutlined from '../../components/presentationals/icons/FolderClosedOutlined';
import FolderClosedSolid from '../../components/presentationals/icons/FolderClosedSolid';
import FolderOpenOutlined from '../../components/presentationals/icons/FolderOpenOutlined';
import FolderOpenSolid from '../../components/presentationals/icons/FolderOpenSolid';
import HashIcon from '../../components/presentationals/icons/HashIcon';
import Inactive from '../../components/presentationals/icons/Inactive';
import InfinityIcon from '../../components/presentationals/icons/InfinityIcon';
import InformationIcon from '../../components/presentationals/icons/InformationIcon';
import Limits from '../../components/presentationals/icons/Limits';
import LoadingIndicatorDots from '../../components/presentationals/icons/LoadingIndicatorDots';
import LockIcon from '../../components/presentationals/icons/LockIcon';
import Logout from '../../components/presentationals/icons/Logout';
import NotificationIcon from '../../components/presentationals/icons/NotificationIcon';
import PeersIcon from '../../components/presentationals/icons/PeersIcon';
import RadarIcon from '../../components/presentationals/icons/RadarIcon';
import RadioDot from '../../components/presentationals/icons/RadioDot';
import RatioIcon from '../../components/presentationals/icons/RatioIcon';
import Ratio from '../../components/presentationals/icons/Ratio';
import Remove from '../../components/presentationals/icons/Remove';
import RemoveMini from '../../components/presentationals/icons/RemoveMini';
import Search from '../../components/presentationals/icons/Search';
import SeedsIcon from '../../components/presentationals/icons/SeedsIcon';
import SettingsIcon from '../../components/presentationals/icons/SettingsIcon';
import SpinnerIcon from '../../components/presentationals/icons/SpinnerIcon';
import StartIcon from '../../components/presentationals/icons/StartIcon';
import StopIcon from '../../components/presentationals/icons/StopIcon';
import TrackerMessageIcon from '../../components/presentationals/icons/TrackerMessageIcon';
import Upload from '../../components/presentationals/icons/Upload';
import UploadThickIcon from '../../components/presentationals/icons/UploadThickIcon';

import styles from './index.module.scss';

export class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdowns: {},
    };

    this.buttons = ['primary', 'secondary', 'white', 'danger', 'success'];
  }

  toggleShow = id => {
    this.setState(state => ({
      dropdowns: {
        ...state.dropdowns,
        [id]: !state.dropdowns[id],
      },
    }));
  };

  render() {
    return (
      <Row className={cl(styles.Demo, 'pb-4')}>
        <Container>
          <Row className="mt-5">
            <Col md="6">
              <h1>Lorem Ipsum h1</h1>
              <h2>Lorem Ipsum h2</h2>
              <h3>Lorem Ipsum h3</h3>
              <h4>Lorem Ipsum h4</h4>
              <h5>Lorem Ipsum h5</h5>
              <h6>Lorem Ipsum h6</h6>
            </Col>
            <Col md="6">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea <a href="#yolo">commodo consequat</a>.
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa{' '}
                <a href="#yole">qui officia deserunt</a>{' '}
                <span className="text-muted">mollit anim id est laborum.</span>
              </p>
            </Col>
          </Row>
          {this.buttons.map(name => (
            <div>
              <Row className="mt-5">
                <Col md="12">
                  <h4>Buttons {name}</h4>
                  <button type="button" className={`btn btn-${name} btn-sm`}>
                    Click me <Calendar />
                  </button>
                  &nbsp;
                  <button type="button" className={`btn btn-${name}`}>
                    Click me <ChevronRight />
                  </button>
                  &nbsp;
                  <button type="button" className={`btn btn-${name} btn-lg`}>
                    Click me <Search />
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className={`btn btn-${name} btn-round btn-lg`}
                  >
                    <ChevronRight />
                  </button>
                  &nbsp;
                  <button type="button" className={`btn btn-${name} btn-round`}>
                    <ChevronRight />
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className={`btn btn-${name} btn-round btn-sm`}
                  >
                    <ChevronRight />
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className={`btn btn-${name} btn-round btn-shadow btn-sm`}
                  >
                    <ChevronRight />
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className={`btn btn-${name} btn-round btn-shadow`}
                  >
                    <ChevronRight />
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className={`btn btn-${name} btn-round btn-shadow btn-lg`}
                  >
                    <ChevronRight />
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className={`btn btn-${name} btn-shadow btn-lg`}
                  >
                    Click me <Search />
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className={`btn btn-${name} btn-shadow`}
                  >
                    Click me <ChevronRight />
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className={`btn btn-${name} btn-shadow btn-sm`}
                  >
                    Click me <Calendar />
                  </button>
                  &nbsp;
                </Col>
              </Row>
              <Row className="mt-5">
                <Col md="12">
                  <h4>Buttons {name} outline</h4>
                  <button
                    type="button"
                    className={`btn btn-outline-${name} btn-sm`}
                  >
                    Click me <Calendar />
                  </button>
                  &nbsp;
                  <button type="button" className={`btn btn-outline-${name}`}>
                    Click me <ChevronRight />
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className={`btn btn-outline-${name} btn-lg`}
                  >
                    Click me <Search />
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className={`btn btn-outline-${name} btn-round btn-lg`}
                  >
                    <ChevronRight />
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className={`btn btn-outline-${name} btn-round`}
                  >
                    <ChevronRight />
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className={`btn btn-outline-${name} btn-round btn-sm`}
                  >
                    <ChevronRight />
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className={`btn btn-outline-${name} btn-round btn-shadow btn-sm`}
                  >
                    <ChevronRight />
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className={`btn btn-outline-${name} btn-round btn-shadow`}
                  >
                    <ChevronRight />
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className={`btn btn-outline-${name} btn-round btn-shadow btn-lg`}
                  >
                    <ChevronRight />
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className={`btn btn-outline-${name} btn-shadow btn-lg`}
                  >
                    Click me <Search />
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className={`btn btn-outline-${name} btn-shadow`}
                  >
                    Click me <ChevronRight />
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className={`btn btn-outline-${name} btn-shadow btn-sm`}
                  >
                    Click me <Calendar />
                  </button>
                  &nbsp;
                </Col>
              </Row>
            </div>
          ))}
        </Container>
        <Container className="mt-5">
          <div className="bg-white">
            <h4>Form input</h4>
            <Row>
              <Col md="6">
                <input
                  type="text"
                  className="form-control is-invalid"
                  placeholder="Error"
                />
              </Col>
              <Col md="6">
                <input
                  type="text"
                  className="form-control is-valid"
                  placeholder="success"
                />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md="12">
                <label>Test label</label>
                <input
                  type="text"
                  value="test"
                  className="form-control"
                  placeholder="Lorem Ipsum"
                />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md="12">
                <h4>Form input group</h4>
                <div className="input-group">
                  <input
                    value=""
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Lorem Ipsum"
                  />
                  <span className="input-group-btn">
                    <button className="btn btn-primary btn-lg" type="button">
                      Click me!
                    </button>
                  </span>
                </div>
              </Col>
            </Row>
          </div>
          <Row className="mt-5">
            <Col>
              <h4>Dropdown</h4>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Dropdown
                isOpen={this.state.dropdowns['0']}
                toggle={() => this.toggleShow(0)}
              >
                <DropdownToggle caret>Dropdown</DropdownToggle>
                <DropdownMenu className={this.state.dropdowns[0] ? 'show' : ''}>
                  <DropdownItem href="http://google.fr">
                    Yolo
                    <button type="button" className="btn btn-primary btn-sm">
                      &times;
                    </button>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
            <Col md="4">
              <Dropdown
                className="dropdown-text"
                isOpen={this.state.dropdowns[1]}
                toggle={() => this.toggleShow(1)}
              >
                <DropdownToggle caret>Dropdown</DropdownToggle>
                <DropdownMenu className={this.state.dropdowns[1] ? 'show' : ''}>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
            <Col md="4">
              <Dropdown
                className="dropdown-text"
                isOpen={this.state.dropdowns[2]}
                toggle={() => this.toggleShow(2)}
              >
                <DropdownToggle className="btn-sm" caret>
                  Dropdown
                </DropdownToggle>
                <DropdownMenu className={this.state.dropdowns[2] ? 'show' : ''}>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md="4">
              <Card className="shadow">
                <CardImg
                  top
                  width="100%"
                  src="http://www.primal-performance.fr/shop/wp-content/uploads/2016/02/placeholder-10.jpg"
                  alt="Card image cap"
                />
                <CardBody className="card-body">
                  <CardTitle>LoremIpsum</CardTitle>
                  <CardSubtitle>Lorem Ipsum</CardSubtitle>
                  <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="shadow">
                <CardHeader>Header</CardHeader>
                <CardBody className="card-body">
                  <CardTitle>LoremIpsum</CardTitle>
                  <CardSubtitle>Lorem Ipsum</CardSubtitle>
                  <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <h4>10 shades of gray</h4>
              <div className={cl(styles.rectangle, 'bg-gray-100 float-left')} />
              <div className={cl(styles.rectangle, 'bg-gray-200 float-left')} />
              <div className={cl(styles.rectangle, 'bg-gray-300 float-left')} />
              <div className={cl(styles.rectangle, 'bg-gray-400 float-left')} />
              <div className={cl(styles.rectangle, 'bg-gray-500 float-left')} />
              <div className={cl(styles.rectangle, 'bg-gray-600 float-left')} />
              <div className={cl(styles.rectangle, 'bg-gray-700 float-left')} />
              <div className={cl(styles.rectangle, 'bg-gray-800 float-left')} />
              <div className={cl(styles.rectangle, 'bg-gray-900 float-left')} />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <h4>Shadow</h4>
              <div
                className={cl(
                  styles.rectangle,
                  'float-left shadow-sm mr-4 bg-white',
                )}
              >
                Shadow sm
              </div>
              <div
                className={cl(
                  styles.rectangle,
                  'float-left shadow mx-4 bg-white',
                )}
              >
                Shadow
              </div>
              <div
                className={cl(
                  styles.rectangle,
                  'float-left shadow-lg ml-4 bg-white',
                )}
              >
                Shadow lg
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <h4>Colors</h4>
              <div
                className={cl(
                  styles.rectangle,
                  'float-left text-white bg-primary',
                )}
              >
                Primary
              </div>
              <div
                className={cl(
                  styles.rectangle,
                  'float-left text-white bg-secondary',
                )}
              >
                Secondary
              </div>
              <div
                className={cl(
                  styles.rectangle,
                  'float-left text-white bg-success',
                )}
              >
                Success
              </div>
              <div
                className={cl(
                  styles.rectangle,
                  'float-left text-white bg-danger',
                )}
              >
                Danger
              </div>
              <div className={cl(styles.rectangle, 'float-left bg-warning')}>
                Warning
              </div>
              <div className={cl(styles.rectangle, 'float-left bg-info')}>
                Info
              </div>
              <div className={cl(styles.rectangle, 'float-left bg-white')}>
                White
              </div>
              <div
                className={cl(
                  styles.rectangle,
                  'float-left text-white bg-dark',
                )}
              >
                Black
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <h4>Border</h4>
              <div
                className={cl(styles.rectangle, 'bg-white float-left rounded')}
              >
                Rounded borders
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md="12">
              <h4>Margins</h4>
            </Col>
            <Col md="12">
              <div
                className={cl(
                  styles.rectangle,
                  'bg-dark text-white float-left p-5 mr-1',
                )}
              >
                Margin 1
              </div>
              <div className={cl(styles.rectangle, 'bg-dark float-left p-5')} />
            </Col>
            <Col md="12" className="mt-2">
              <div
                className={cl(
                  styles.rectangle,
                  'bg-dark text-white float-left p-5 mr-2',
                )}
              >
                Margin 2
              </div>
              <div className={cl(styles.rectangle, 'bg-dark float-left p-5')} />
            </Col>
            <Col md="12" className="mt-2">
              <div
                className={cl(
                  styles.rectangle,
                  'bg-dark text-white float-left p-5 mr-3',
                )}
              >
                Margin 3
              </div>
              <div className={cl(styles.rectangle, 'bg-dark float-left p-5')} />
            </Col>
            <Col md="12" className="mt-2">
              <div
                className={cl(
                  styles.rectangle,
                  'bg-dark text-white float-left p-5 mr-4',
                )}
              >
                Margin 4
              </div>
              <div className={cl(styles.rectangle, 'bg-dark float-left p-5')} />
            </Col>
            <Col md="12" className="mt-2">
              <div
                className={cl(
                  styles.rectangle,
                  'bg-dark text-white float-left p-5 mr-5',
                )}
              >
                Margin 5
              </div>
              <div className={cl(styles.rectangle, 'bg-dark float-left p-5')} />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <h4>Icon</h4>
              <div>
                <Active />
                <Add />
                <AddMini />
                <All />
                <ArrowIcon />
                <CalendarCreatedIcon />
                <CalendarIcon />
                <Checkmark />
                <ChevronLeftIcon />
                <ChevronRightIcon />
                <CircleCheckmarkIcon />
                <CircleExclamationIcon />
                <CircleIcon />
                <ClipboardIcon />
                <ClockIcon />
                <Close />
                <CommentIcon />
                <Completed />
                <DetailNotAvailableIcon />
                <DiskIcon />
                <Disk />
                <DotsMini />
                <Download />
                <DownloadSmall />
                <DownloadThickIcon />
                <Edit />
                <ErrorIcon />
                <ETA />
                <FeedIcon />
                <File />
                <Files />
                <FolderClosedOutlined />
                <FolderClosedSolid />
                <FolderOpenOutlined />
                <FolderOpenSolid />
                <HashIcon />
                <Inactive />
                <InfinityIcon />
                <InformationIcon />
                <Limits />
                <LoadingIndicatorDots />
                <LockIcon />
                <Logout />
                <NotificationIcon />
                <PeersIcon />
                <RadarIcon />
                <RadioDot />
                <RatioIcon />
                <Ratio />
                <Remove />
                <RemoveMini />
                <Search />
                <SeedsIcon />
                <SettingsIcon />
                <SpinnerIcon />
                <StartIcon />
                <StopIcon />
                <TrackerMessageIcon />
                <Upload />
                <UploadThickIcon />
              </div>
            </Col>
          </Row>
        </Container>
      </Row>
    );
  }
}

export default Index;
