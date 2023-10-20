import { screen, render } from '@testing-library/react';
import DescriptionTab from './description-tab';
import { makeFakeCamera } from '../../../utils-test/mocks';

const fakeCamera = makeFakeCamera();

describe('DescriptionTab component', () => {

  it('render tab element with description', () => {
    render(
      <DescriptionTab camera={fakeCamera} isActive />
    );

    expect(screen.getByText(fakeCamera.description)).toBeInTheDocument();
  });

  it('render inactive tab element', () => {
    const descriptionTabTestId = 'description-tab';

    render(
      <DescriptionTab camera={fakeCamera} isActive={false} />
    );

    expect(screen.getByTestId(descriptionTabTestId)).not.toHaveClass('is-active');
  });

  it('render active tab element', () => {
    const descriptionTabTestId = 'description-tab';

    render(
      <DescriptionTab camera={fakeCamera} isActive />
    );

    expect(screen.getByTestId(descriptionTabTestId)).toHaveClass('is-active');
  });
});
