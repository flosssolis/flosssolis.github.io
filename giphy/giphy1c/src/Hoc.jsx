import React from "react";

const LoadingHOC = ({ data, Comp, ...props }) => {
  const ComponentToRender =
    data.length === 0
      ? class Loading extends React.Component {
          render() {
            return <div>dfghj</div>;
          }
        }
      : class Component extends React.Component {
          render() {
            return <Comp data={data} {...props} />;
          }
        };

  return <ComponentToRender />;
};

export default LoadingHOC;

// return this.props.data.length === 0 ? (
//   <div>loading...</div>
// ) : (
//   <SubComponent />
// );
