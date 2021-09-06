import logo200Image from 'assets/img/logo/charge_zonelogo.png';
import sidebarBgImage from 'assets/img/sidebar/charge_bg.jpg';
import SourceLink from '../src/components/SourceLink';
import React from 'react';
import { FaUsersCog, FaList, FaFilePdf, FaCarBattery, FaCog,
  FaCarSide, FaCalculator, FaUserCheck, FaRetweet, FaClipboardList, FaRoute, FaRegListAlt,
} from 'react-icons/fa';
import {
  MdDashboard,MdWidgets, MdKeyboardArrowDown,MdBorderAll,MdBatteryChargingFull,MdFormatAlignLeft,MdAssignmentTurnedIn, MdEvStation, MdSwapHoriz, MdPower,MdViewCompact,MdError,
  MdSync
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};


const navItems = [
  { to: '/home', name: 'Operator dashboard', exact: true, Icon: MdDashboard },
  { to: '/admindashboard', name: 'Admin Dashboard', exact: true, Icon: MdViewCompact },
  { to: '/mgrdashboard', name: 'Mgr dashboard', exact: true, Icon: MdDashboard },
  
];
const navmasters = [
  { to: '/user', name: 'user', exact: false, Icon: FaUsersCog },
  { to: '/role', name: 'role', exact: false, Icon: FaList },
  { to: '/battery', name: 'Battery', exact: false, Icon: FaCarBattery },
  { to: '/ev', name: 'Electrical Vehicle', exact: false, Icon: FaCarSide },
  { to: '/bulkcharger', name: 'Bulk charger', exact: false, Icon: MdPower },
  { to: '/fleetoperator', name: 'Fleet Operator', exact: false, Icon: FaUserCheck },
  { to: '/owner', name: 'Owner Master', exact: false, Icon: FaUserCheck },
  { to: '/oem', name: 'OEM', exact: false, Icon: FaCog },
  { to: '/swapping_station', name: 'Swapping Stations', exact: false, Icon: MdEvStation },
  { to: '/fault', name: 'Fault Reporting', exact: false, Icon: MdError },
  { to: '/stationoperator', name: 'Station Operator', exact: false, Icon: FaUserCheck },
];
const navmapping = [
  { to: '/ev_mapping', name: 'EV Mapping', exact: false, Icon: MdSwapHoriz },
  { to: '/battery_mapping', name: 'Battery Mapping', exact: false, Icon: MdBatteryChargingFull },
  { to: '/station', name: 'Station Mapping', exact: false, Icon: FaRetweet },
];
const navContents = [
  { to: '/energyreport', name: 'Energy', exact: false, Icon: FaFilePdf },
  { to: '/invoicereport', name: 'Invoice', exact: false, Icon: FaFilePdf },
  { to: '/swapreport', name: 'Swap', exact: false, Icon: FaFilePdf },
  { to: '/transactionreport', name: 'Transaction', exact: false, Icon: FaFilePdf },
  { to: '/faultreport', name: 'Fault', exact: false, Icon: FaFilePdf },
];
const navOperation = [
  { to: '/transactionoperation', name: 'Transaction', exact: false, Icon: FaClipboardList },
  { to: '/queue', name: 'Queue', exact: false, Icon: MdFormatAlignLeft },
];
const navInventory = [
  { to: '/batteryinventory', name: 'Battery', exact: false, Icon: MdBatteryChargingFull },
  { to: '/chargerinventory', name: 'Charger', exact: false, Icon: MdSwapHoriz },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenReports: false,
    isOpenMapping: false,
    isOpenMasters: false,
    isOpenOperation: false,
    isOpenInventory: false,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar className="side_nav">
            <SourceLink className="navbar-brand p-0 mr-0">
              <img
                src={logo200Image}
                width="40"
                height="30"
                className="logocss"
                alt=""
              />
              {/* <span className="text-white">
                <b>Charge Zone</b>
              </span> */}
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Masters')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdBorderAll className={bem.e('nav-item-icon')} />
                  <span className="">MASTERS</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenMasters
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenMasters}>
              {navmasters.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Mapping')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdWidgets className={bem.e('nav-item-icon')} />
                  <span className="">MAPPING</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenMapping
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenMapping}>
              {navmapping.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Operation')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <FaCalculator className={bem.e('nav-item-icon')} />
                  <span className="">OPERATIONS</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenOperation
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenOperation}>
              {navOperation.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Inventory')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdBorderAll className={bem.e('nav-item-icon')} />
                  <span className="">Inventory</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenInventory
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenInventory}>
              {navInventory.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Reports')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <FaFilePdf className={bem.e('nav-item-icon')} />
                  <span className="">REPORTS</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenReports
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenReports}>
              {navContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
