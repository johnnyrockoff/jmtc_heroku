import React from "react";
import { Card } from 'antd';
const { Meta } = Card;

export default class CharCard extends React.Component {
    render() {
        const char = this.props;
        return (
            <Card hoverable style={{ width: 240 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                <Meta title={char.name} description="www.instagram.com" />
            </Card>
        );
    }
}