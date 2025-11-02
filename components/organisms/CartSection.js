'use client'

import { Card } from '../atoms/Card'
import { Button } from '../atoms/Button'
import { Badge } from '../atoms/Badge'
import { Alert } from '../atoms/Alert'

export function CartSection({ 
  cart, 
  totalPrice,
  onClearCart,
  onSubmitCart,
  submitting = false,
  error,
  success,
  onDismissError,
  onDismissSuccess,
}) {
  return (
    <div className="container-fluid bg-light py-4 mt-4 border-top">
      <div className="container">
        {error && (
          <Alert variant="danger" dismissible onDismiss={onDismissError} className="mb-3">
            <strong>Error!</strong> {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success" dismissible onDismiss={onDismissSuccess} className="mb-3">
            <strong>Success!</strong> Order submitted successfully!
          </Alert>
        )}

        <Card
          title={
            <>
              <span className="me-2">🛒</span>
              Shopping Cart
              {cart.length > 0 && (
                <Badge variant="primary" className="ms-2">{cart.length}</Badge>
              )}
            </>
          }
        >
          {cart.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <div className="display-1 mb-3">🛒</div>
              <h5>Your cart is empty</h5>
              <p className="mb-0">Add items from the menu above</p>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Item</th>
                      <th>Type</th>
                      <th className="text-end">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={item.id || index}>
                        <td><strong>{item.name}</strong></td>
                        <td><Badge variant="secondary">{item.Type}</Badge></td>
                        <td className="text-end fw-bold">
                          {item.price?.toLocaleString('th-TH', {
                            style: 'currency',
                            currency: 'THB'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="table-light">
                    <tr>
                      <th colSpan="2" className="text-end">Total:</th>
                      <th className="text-end text-primary fs-5">
                        {totalPrice.toLocaleString('th-TH', {
                          style: 'currency',
                          currency: 'THB'
                        })}
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </>
          )}
        </Card>

        {cart.length > 0 && (
          <div className="d-flex gap-2 justify-content-end mt-3">
            <Button
              variant="outline-danger"
              onClick={onClearCart}
              disabled={submitting}
              icon="🗑️"
            >
              Clear Cart
            </Button>
            <Button
              variant="success"
              onClick={onSubmitCart}
              disabled={submitting || cart.length === 0}
              loading={submitting}
              icon="✅"
            >
              {submitting ? 'Processing...' : 'Submit Order'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
