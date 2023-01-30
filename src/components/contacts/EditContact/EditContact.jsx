import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService'
import Spinner from '../../Spinner/Spinner'

let EditContact = () => {
  let navigate = useNavigate()
  let { contactId } = useParams()

  let [state, setState] = useState({
    loading: false,
    contact: {
      site: '',
      site_manager: '',
      photo: '',
      phone: '',
      email: '',
      vendor: '',
      groupId: '',
      vendor_phone: '',
      vendor_email: '',
    },
    groups: [],
    errorMessage: '',
  })

  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state, loading: true })
        let response = await ContactService.getContact(contactId)
        let groupResponse = await ContactService.getGroups()
        setState({
          ...state,
          loading: false,
          contact: response.data,
          groups: groupResponse.data,
        })
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        })
      }
    }
    fetchData()
  }, [contactId])

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    })
  }

  let submitForm = async (event) => {
    event.preventDefault()
    try {
      let response = await ContactService.updateContact(
        state.contact,
        contactId,
      )
      if (response) {
        navigate('/contacts/list', { replace: true })
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message })
      navigate(`/contacts/edit/${contactId}`, { replace: false })
    }
  }

  let { loading, contact, groups, errorMessage } = state

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="add-contact p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h3 text-primary fw-bold">Edit Contact</p>
                  <p className="fst-italic p-3">
                    If you would like to edit/update information below as
                    needed.
                  </p>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-md-4">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="site"
                        value={contact.site}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Site"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="site_manager"
                        value={contact.site_manager}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Site Manager"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="photo"
                        value={contact.photo}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Photo Url"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="phone"
                        value={contact.phone}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Phone"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="email"
                        value={contact.email}
                        onChange={updateInput}
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="vendor"
                        value={contact.vendor}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Vendor"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        required="true"
                        name="groupId"
                        value={contact.groupId}
                        onChange={updateInput}
                        className="form-control"
                      >
                        <option value="">Select Category</option>
                        {groups.length > 0 &&
                          groups.map((group) => {
                            return (
                              <option key={group.Id} value={group.id}>
                                {group.name}
                              </option>
                            )
                          })}
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="vendor_phone"
                        value={contact.vendor_phone}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Vendor Phone"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required="true"
                        name="vendor_email"
                        value={contact.vendor_email}
                        onChange={updateInput}
                        type="email"
                        className="form-control"
                        placeholder="Vendor Email"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Update"
                      />
                      <Link to={'/contacts/list'} className="btn btn-dark ms-2">
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-6">
                  <img src={contact.photo} alt="" className="contact-img" />
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
export default EditContact
