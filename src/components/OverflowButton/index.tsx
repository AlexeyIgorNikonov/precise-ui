import * as React from 'react';
import onClickOutside, { AdditionalProps } from 'react-onclickoutside';
import {
  InteractiveListWrapperProps,
  InteractiveListItem,
  InteractiveList,
  InteractiveListProps,
} from '../InteractiveList';
import { Flyout, FlyoutProps } from '../Flyout';

export interface OverflowButtonProps {
  group: Array<React.ReactChild>;
  toggleButton?: React.ReactNode;
  flyoutProps?: Partial<FlyoutProps>;
  interactiveListProps?: Partial<InteractiveListProps>;
}

export interface OverflowButtonState {
  open: boolean;
  items: Array<InteractiveListItem>;
}

const CustomWrapper: React.SFC<InteractiveListWrapperProps> = ({
  open: _0,
  flyout: _1,
  border: _2,
  direction: _3,
  ...props
}) => <div {...props} />;
CustomWrapper.displayName = 'CustomWrapper';

function getItems(group: Array<React.ReactChild>): Array<InteractiveListItem> {
  return group.map((item, index) => ({
    content: item,
    key: index.toString(),
  }));
}

class OverflowButtonInt extends React.Component<OverflowButtonProps, OverflowButtonState> {
  constructor(props: OverflowButtonProps) {
    super(props);

    this.state = {
      open: false,
      items: getItems(props.group),
    };
  }

  handleClickOutside = () => {
    this.state.open &&
      this.setState({
        open: false,
      });
  };

  componentWillReceiveProps(nextProps: OverflowButtonProps) {
    this.setState({
      items: getItems(nextProps.group),
    });
  }

  private toggleGroup = (e: React.MouseEvent) => {
    const { open } = this.state;

    this.setState({
      open: !open,
    });

    e.preventDefault();
  };

  private closeList = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { open, items } = this.state;
    const { toggleButton, flyoutProps, interactiveListProps } = this.props;

    return (
      <Flyout
        noGutter
        content={
          <InteractiveList
            open={open}
            autoFocus
            data={items}
            onBlur={this.closeList}
            onChange={this.closeList}
            customWrapper={CustomWrapper}
            {...interactiveListProps}
          />
        }
        {...flyoutProps}
        open={open}>
        <div onClick={this.toggleGroup}>{toggleButton || '...'}</div>
      </Flyout>
    );
  }
}

export const OverflowButton: React.ComponentClass<AdditionalProps & OverflowButtonProps> = onClickOutside(
  OverflowButtonInt,
);
