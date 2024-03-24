// reactstrap components
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Spinner,
} from "reactstrap";
import CustomTable from "components/CustomTable/CustomTable";
import { useEffect, useState } from "react";
import UserHeader from "components/Headers/UserHeader";
import { useGetInventory } from "utils/auth.api";
import { useCreateInventory } from "utils/auth.api";
import { toast } from "react-toastify";
import { useEditInventory } from "utils/auth.api";
import { useDeleteInventory } from "utils/auth.api";

const Inventory = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleModal = () => setOpenModal(!openModal);
  const toggleEditModal = () => setEditModal(!editModal);
  const deleteToggle = () => setDeleteModal(!deleteModal);
  const { data, isLoading } = useGetInventory();
  const createInventoryMutation = useCreateInventory();
  const editInventoryMutation = useEditInventory();
  const deleteInventoryMutation = useDeleteInventory();
  const [rows, setRows] = useState([]);
  const columns = ["SR No.", "Name", "Quantity", "Actions"];
  const [formData, setFormData] = useState({
    name: "",
    amount: 0,
  });
  const [id, setId] = useState("");

  const reArrageData = () => {
    let tempArr = [];

    data?.forEach((dat, idx) => {
      tempArr?.push({
        idx: idx + 1,
        name: dat?.name,
        quantity: dat?.amount,

        actions: (
          <>
            <Button size="sm" color="info">
              <i class="fa-regular fa-eye"></i>
            </Button>
            <Button
              size="sm"
              color="danger"
              onClick={() => {
                deleteToggle();
                setId(dat?.id);
              }}
            >
              <i class="fa-solid fa-trash"></i>
            </Button>
            <Button
              size="sm"
              color="danger"
              onClick={() => {
                toggleEditModal();
                setFormData({
                  name: dat?.name,
                  amount: dat?.amount,
                });
                setId(dat?.id);
              }}
            >
              <i class="fa-solid fa-edit"></i>
            </Button>
          </>
        ),
      });
    });
    setRows(tempArr);
  };

  useEffect(() => {
    reArrageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex align-items-center">
                <Col
                  md="12"
                  className="p-0 d-flex justify-content-between w-full align-items-center"
                >
                  <h3 className="mb-0">Inventory</h3>
                  <Button color="primary" onClick={toggleModal}>
                    Add Inventory
                  </Button>
                </Col>
              </CardHeader>

              <CustomTable
                columns={columns}
                rows={rows}
                isLoading={isLoading}
              />

              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
      <Modal isOpen={openModal} toggle={toggleModal}>
        <ModalHeader className="pb-0" toggle={toggleModal}>
          Add Inventory
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Name</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Inventory A"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="time">Quantity</Label>
              <Input
                type="timestamp"
                name="time"
                id="time"
                placeholder="200"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </FormGroup>
          </Form>
          <Row className="w-full justify-content-end mr-2">
            <Button
              color="danger"
              className=""
              onClick={async () => {
                try {
                  if (formData?.name === "" || formData?.amount === 0) {
                    toast.error("Fields cannot be empty");
                    return;
                  }
                  await createInventoryMutation?.mutateAsync(formData);
                  toast.success("Inventory created successfully!!!");
                  setFormData({
                    name: "",
                    amount: 0,
                  });
                  toggleModal();
                } catch (error) {
                  toast.error(error.message);
                }
              }}
            >
              {createInventoryMutation?.isLoading ? (
                <Spinner size="sm" />
              ) : (
                "Add Inventory"
              )}
            </Button>
            <Button
              color="secondary"
              onClick={toggleModal}
              className=" "
              disabled={createInventoryMutation?.isLoading}
            >
              Cancel
            </Button>
          </Row>
        </ModalBody>
      </Modal>
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader className="pb-0" toggle={toggleEditModal}>
          Edit Inventory
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Name</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Inventory A"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="time">Quantity</Label>
              <Input
                type="timestamp"
                name="time"
                id="time"
                placeholder="200"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </FormGroup>
          </Form>
          <Row className="w-full justify-content-end mr-2">
            <Button
              color="danger"
              className=""
              onClick={async () => {
                try {
                  if (formData?.name === "" || formData?.amount === 0) {
                    toast.error("Fields cannot be empty");
                    return;
                  }
                  const data = {
                    ...formData,
                    id,
                  };
                  await editInventoryMutation?.mutateAsync(data);
                  toast.success("Inventory edited successfully!!!");
                  setFormData({
                    name: "",
                    amount: 0,
                  });
                  setId("");
                  toggleEditModal();
                } catch (error) {
                  toast.error(error.message);
                }
              }}
            >
              {editInventoryMutation?.isLoading ? (
                <Spinner size="sm" />
              ) : (
                "Edit Inventory"
              )}
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                toggleEditModal();
                setFormData({
                  name: "",
                  amount: 0,
                });
                setId("");
              }}
              className=" "
              disabled={editInventoryMutation?.isLoading}
            >
              Cancel
            </Button>
          </Row>
        </ModalBody>
      </Modal>
      <Modal isOpen={deleteModal} toggle={deleteToggle}>
        <ModalHeader className="pb-0" toggle={deleteToggle}>
          Delete Inventory
        </ModalHeader>
        <ModalBody className="pb-0 d-flex flex-column justify-content-center align-items-center ">
          <Row>
            <i
              className="fa fa-times-circle fa-3x fa-primary"
              style={{
                color: "#e8294a",
              }}
              aria-hidden="true"
            ></i>
          </Row>
          <Row className="mt-4">
            Are you sure about deleting this Inventory?
          </Row>
          <Button
            color="primary"
            onClick={async () => {
              try {
                await deleteInventoryMutation?.mutateAsync(id);
                toast.success("Deleted!");
                setId("");
                deleteToggle();
              } catch (error) {
                toast.error(error?.message);
              }
            }}
            className="w-100 mt-4"
          >
            {deleteInventoryMutation?.isLoading ||
            deleteInventoryMutation?.isLoading ? (
              <Spinner size="sm" />
            ) : (
              "Delete Inventory"
            )}
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              deleteToggle();
              setId("");
            }}
            disabled={deleteInventoryMutation?.isLoading}
            className="w-100 mt-4 mb-4"
          >
            Cancel
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Inventory;
