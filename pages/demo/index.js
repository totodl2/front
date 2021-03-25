import { PureComponent } from 'react';
import { VisibleContainerLoader } from '../../components/presentationals/loader';

class DemoPage extends PureComponent {
  state = {
    component: null,
  };

  componentDidMount() {
    import('../../components/site/demo').then(component => {
      this.setState({ component: component.Index });
    });
  }

  render() {
    const { component: Component } = this.state;
    if (!Component) {
      return <VisibleContainerLoader visible />;
    }
    return <Component />;
  }
}

export default DemoPage;
