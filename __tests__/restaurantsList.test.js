import React from 'react';
import renderer from 'react-test-renderer';
import Restcard from '../src/common/Restcard';
import RestaurantsList from '../src/container/restaurantsList';
import Images from "../src/utils/Images"
// let props = {

// }
jest.mock('../src/utils/Images');
// test('renders correctly', () => {
    // const tree = renderer.create(<Restcard icon={"data"}
    //     // icon={item.photos[0].photo_reference
    //     iconBackColor={"black"}
    //     name={"123"}
    //     rating={"4"}
    //     open_now={"true"}
    //     isDir_Show={"true"}
    //     Address={"item?.vicinity"} />).toJSON();
    // expect(tree).toMatchSnapshot();
// });