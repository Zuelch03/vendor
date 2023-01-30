import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService'

let AddContact = () => {
  let navigate = useNavigate()

  let [state, setstate] = useState({
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

  let updateInput = (event) => {
    setstate({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    })
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setstate({ ...state, loading: true })
        let response = await ContactService.getGroups()
        setstate({
          ...state,
          loading: false,
          groups: response.data,
        })
      } catch (error) {}
    }
    fetchData()
  }, [])

  let submitForm = async (event) => {
    event.preventDefault()
    try {
      let response = await ContactService.createContact(state.contact)
      if (response) {
        navigate('/contacts/list', { replace: true })
      }
    } catch (error) {
      setstate({ ...state, errorMessage: error.message })
      navigate('/contacts/add', { replace: false })
    }
  }

  let { loading, contact, groups, errorMessage } = state

  return (
    <React.Fragment>
      <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-success fw-bold">Create Contact</p>
              <p className="fst-italic">
                Below please fill out all required information. Site code, Site
                Manager, Photo URL of vendor logo, Site Manager phone number,
                Site Manager email, Vendor Company name, Vendor's expertise,
                Vendor's phone and email address.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                    required={true}
                    name="site"
                    value={contact.name}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Site"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="site_manager"
                    value={contact.site_manager}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Site Manager"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="photo"
                    value={contact.photo}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Photo Url"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="phone"
                    value={contact.phone}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Phone"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="email"
                    value={contact.email}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="vendor"
                    value={contact.vendor}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Vendor"
                  />
                </div>
                <div className="mb-2">
                  <select
                    required={true}
                    name="groupId"
                    value={contact.groupId}
                    onChange={updateInput}
                    className="form-control"
                  >
                    <option value="">Select Category</option>
                    {groups.length > 0 &&
                      groups.map((group) => {
                        return (
                          <option key={group.id} value={group.id}>
                            {group.name}
                          </option>
                        )
                      })}
                  </select>
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="vendor_phone"
                    value={contact.vendor_phone}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Vendor Phone"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="vendor_email"
                    value={contact.vendor_email}
                    onChange={updateInput}
                    className="form-control"
                    placeholder="Vendor Email"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Create"
                  />
                  <Link to={'/contacts/list'} className="btn btn-dark ms-2">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}
export default AddContact
