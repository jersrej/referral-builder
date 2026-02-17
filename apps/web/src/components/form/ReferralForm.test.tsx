import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test/test-utils';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import ReferralForm from './ReferralForm';

describe('ReferralForm', () => {
  it('renders form fields', () => {
    renderWithProviders(<ReferralForm onChange={vi.fn()} />);

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    renderWithProviders(<ReferralForm onChange={vi.fn()} />);

    const submitButton = screen.getByRole('button');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0);
    });
  });

  it('calls onSubmit with valid data', async () => {
    const mockSubmit = vi.fn();

    renderWithProviders(<ReferralForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: 'John' }
    });

    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: 'Doe' }
    });

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'john@example.com' }
    });

    fireEvent.change(screen.getByLabelText(/Phone/i), {
      target: { value: '123456' }
    });

    fireEvent.change(screen.getByLabelText(/Home #/i), {
      target: { value: '12' }
    });

    fireEvent.change(screen.getByLabelText(/Street/i), {
      target: { value: 'Main St' }
    });

    fireEvent.change(screen.getByLabelText(/Suburb/i), {
      target: { value: 'City' }
    });

    fireEvent.change(screen.getByLabelText(/State/i), {
      target: { value: 'State' }
    });

    fireEvent.change(screen.getByLabelText(/Postcode/i), {
      target: { value: '1234' }
    });

    fireEvent.change(screen.getByLabelText(/Country/i), {
      target: { value: 'Country' }
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  it('renders default values in edit mode', () => {
    renderWithProviders(
      <ReferralForm
        defaultValues={{
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com'
        }}
      />
    );

    expect(screen.getByDisplayValue('Jane')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('jane@example.com')).toBeInTheDocument();
  });

  it('should submit when avatar removed in edit mode', async () => {
    const mockSubmit = vi.fn();

    renderWithProviders(
      <ReferralForm
        defaultValues={{
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '123',
          homeNumber: '12',
          street: 'Main',
          suburb: 'City',
          state: 'State',
          postcode: '1234',
          country: 'Country',
          avatarUrl: 'http://test/avatar.png'
        }}
        onSubmit={mockSubmit}
      />
    );

    const removeBtn = screen.getByText('✕');
    fireEvent.click(removeBtn);

    const submitBtn = screen.getByRole('button');

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  it('should submit when avatar removed in edit mode', async () => {
    const mockSubmit = vi.fn();

    renderWithProviders(
      <ReferralForm
        defaultValues={{
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '123',
          homeNumber: '12',
          street: 'Main',
          suburb: 'City',
          state: 'State',
          postcode: '1234',
          country: 'Country',
          avatarUrl: 'http://test/avatar.png'
        }}
        onSubmit={mockSubmit}
      />
    );

    // remove avatar
    const removeBtn = screen.getByText('✕');
    fireEvent.click(removeBtn);

    // submit
    const submitBtn = screen.getByRole('button');
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});
