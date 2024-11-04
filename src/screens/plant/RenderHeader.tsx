import { useAppRoute } from '../../hooks';
import {components} from '../../components';


const RenderHeader = ({item}): JSX.Element => {
    const route = useAppRoute();
    console.log('route', route);
    return (
      <components.Header
        title={item}
        logoIcon={true}
        goBackIcon={true}
        basketIcon={true}
        bottomLine={true}
        exception={true}
      />
    );
  };

export default RenderHeader;
