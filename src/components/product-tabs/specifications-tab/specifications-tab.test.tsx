import { screen, render } from '@testing-library/react';
import SpecificationsTab from './specifications-tab';
import { makeFakeCamera } from '../../../utils-test/mocks';

const fakeCamera = makeFakeCamera();

describe('Component: DescriptionTab', () => {

  it('should render tab element with description', () => {

    render(<SpecificationsTab camera={fakeCamera} isActive/>);

    expect(screen.getByText(fakeCamera.level)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.category)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.type)).toBeInTheDocument();
  });

  it('renders inactive tab element', () => {
    const specTestId = 'specifications-tab';

    render(<SpecificationsTab camera={fakeCamera} isActive={false} />);

    expect(screen.getByTestId(specTestId)).not.toHaveClass('is-active');
  });

  it('renders active tab element', () => {
    const specTestId = 'specifications-tab';

    render(
      <SpecificationsTab camera={fakeCamera} isActive />
    );

    expect(screen.getByTestId(specTestId)).toHaveClass('is-active');
  });
});
