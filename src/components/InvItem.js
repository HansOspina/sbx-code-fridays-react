import React, {Component} from 'react';
import './InvItem.css';


class InvItem extends Component {

  constructor(props) {
    super(props);
  }


  render() {

    const el = this.props.el;

    return (
      <tr key={el._KEY}>
        <td>
          <table>
            <tbody>
            <tr>
              <td width="110xpx"><img className="imgProd" src={el.img}/></td>
              <td width="210xpx"><label>{el.name}</label></td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
    )

  }

}

export default InvItem;