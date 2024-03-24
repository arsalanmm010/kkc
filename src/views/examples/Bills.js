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
import { useGetBill } from "utils/auth.api";
import { useCreateBill } from "utils/auth.api";
import { toast } from "react-toastify";
import { useGetInventory } from "utils/auth.api";

const Bills = () => {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal(!openModal);
  const { data, isLoading } = useGetBill();
  const { data: inventoryData } = useGetInventory();
  const createBillMutation = useCreateBill();
  const [rows, setRows] = useState([]);
  const columns = [
    "SR No.",
    "Bill Name",
    "Inventory Name",
    "price",
    "quantity",
    "total",
    "Timestamp",
  ];
  const [formData, setFormData] = useState({
    name: "",
    InventoryName: "",
    amount: 0,
    price: 0,
    total: 0,
  });
  const reArrageData = () => {
    let tempArr = [];

    data?.forEach((dat, idx) => {
      tempArr?.push({
        idx: idx + 1,
        billName: dat?.name,
        inventoryName: dat?.InventoryName,
        price: dat?.price,
        quantity: dat?.amount,
        total: dat?.total,
        timestamp: dat?.createdAt
          ? new Date(dat.createdAt).toISOString().slice(0, 19).replace("T", " ")
          : null,

        // actions: (
        //   <>
        //     <Button size="sm" color="info">
        //       <i class="fa-regular fa-eye"></i>
        //     </Button>
        //     <Button size="sm" color="danger" onClick={deleteToggle}>
        //       <i class="fa-solid fa-trash"></i>
        //     </Button>
        //   </>
        // ),
      });
    });
    setRows(tempArr);
  };
  console.log(formData);

  const handleSelectChange = (event) => {
    const selectedInventoryName = event.target.value;
    setFormData({
      ...formData,
      InventoryName: selectedInventoryName,
    });
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
                    Create Bill
                  </Button>
                </Col>
                {/* <Col className="d-flex align-items-center">
                  <Label for="searchEntry" className="mr-2 mb-0">
                    Search
                  </Label>
                  <Input
                    id="searchEntry"
                    type="search"
                    onChange={(e) => {
                      // setSearchEntry(e.target.value);
                    }}
                  />
                </Col> */}
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
        <Modal isOpen={openModal} toggle={toggleModal}>
          <ModalHeader className="pb-0" toggle={toggleModal}>
            Add Bill
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="title">Bill Name</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Bill Name"
                  value={formData?.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="time">Inventory Item</Label>
                <Input
                  type="select"
                  name="InventoryName"
                  id="InventoryName"
                  value={formData.InventoryName}
                  onChange={handleSelectChange}
                >
                  <option value="">Select Item</option>
                  {inventoryData?.map((dat) => (
                    <option value={dat?.name} key={dat?.id}>
                      {dat?.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="time">Quantity</Label>
                <Input
                  type="timestamp"
                  name="time"
                  id="time"
                  placeholder="200"
                  value={formData?.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="time">Price</Label>
                <Input
                  type="timestamp"
                  name="time"
                  id="time"
                  placeholder="10"
                  value={formData?.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="time">Total</Label>
                <Input
                  disabled
                  type="timestamp"
                  name="time"
                  id="time"
                  placeholder="2000"
                  value={formData?.amount * formData.price}
                />
              </FormGroup>
            </Form>
            <Row className="w-full justify-content-end mr-2">
              <Button
                color="danger"
                className=" "
                disabled={createBillMutation?.isLoading}
                onClick={async () => {
                  try {
                    if (
                      formData?.name === "" ||
                      formData?.amount === 0 ||
                      formData?.InventoryName === "" ||
                      formData?.price === 0
                    ) {
                      toast.error("Fields cannot be empty");
                      return;
                    }
                    const data = {
                      ...formData,
                      total: formData?.amount * formData?.price,
                    };
                    await createBillMutation?.mutateAsync(data);
                    toast.success("Bill created successfully!!!");
                    setFormData({
                      name: "",
                      InventoryName: "",
                      amount: 0,
                      price: 0,
                      total: 0,
                    });
                    toggleModal();
                  } catch (error) {
                    toast.error(error.message);
                  }
                }}
              >
                {createBillMutation?.isLoading ? (
                  <Spinner size="sm" />
                ) : (
                  "Create Bill"
                )}
              </Button>
              <Button
                color="secondary"
                onClick={toggleModal}
                className=" "
                disabled={createBillMutation?.isLoading}
              >
                Cancel
              </Button>
            </Row>
          </ModalBody>
        </Modal>
      </Container>
    </div>
  );
};

export default Bills;
