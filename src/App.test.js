import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { JobView, Search } from './components';

// JobView Test
test('renders "find your next job here" when jobs array is not empty ', () => {
  render(<JobView jobs={[]} currentPage={1} />);
  const textElement = screen.getByText(/Find your next job here/i);
  expect(textElement).toBeInTheDocument();
});
// JobView Test
// test('replaces "find your next job here" when jobs array is empty ', async () => {
//   render(
//     <JobView
//       jobs={[
//         {
//           id: '1',
//           name: 'Test',
//           url: 'test url',
//           name: 'test name',
//           posted_time_friendly: '2 days ago',
//           location: 'test',
//           hiring_company: {
//             name: 'test company',
//             url: 'test url for company',
//           },
//         },
//       ]}
//       currentPage={1}
//     />
//   );

//   const Card = await screen.findByTestId('jobcard');
//   expect(Card).toBeInTheDocument();
// });

// Search Tests

describe('Search Component', () => {
  test('should render input element', () => {
    render(<Search />);
    const inputElement = screen.getByPlaceholderText(/Keywords/i);
    expect(inputElement).toBeInTheDocument;
  });

  test('should render input element', () => {
    render(<Search />);
    const inputElement = screen.getByPlaceholderText(/City/i);
    expect(inputElement).toBeInTheDocument;
  });

  test('should update when typed in the input', () => {
    render(<Search />);
    const inputElement = screen.getByPlaceholderText(/Keywords/i);
    fireEvent.change(inputElement, { target: { value: 'Developer' } });
    expect(inputElement.value).toBe('Developer');
  });

  test('should update when typed in the input', () => {
    render(<Search />);
    const inputElement = screen.getByPlaceholderText(/City/i);
    fireEvent.change(inputElement, { target: { value: 'Vancouver' } });
    expect(inputElement.value).toBe('Vancouver');
  });

  test('should fetch results and render jobcards', async () => {
    render(<Search />);
    const inputElement = screen.getByPlaceholderText(/City/i);
    const buttonElement = screen.getByRole('button', { name: 'Search' });
    fireEvent.change(inputElement, { target: { value: 'Vancouver' } });
    fireEvent.click(buttonElement);

    // If job cards being rendered after sending the fetch request asynchronously our search works.
    await screen.findAllByTestId('jobcard');
  });
});
