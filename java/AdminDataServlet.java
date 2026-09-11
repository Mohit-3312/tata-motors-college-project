import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@WebServlet("/AdminDataServlet")
public class AdminDataServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    // XAMPP MySQL defaults
    private static final String DB_URL =
            "jdbc:mysql://localhost:3306/tatadb?useSSL=false&serverTimezone=UTC";

    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "";

    private final Gson gson = new Gson();

    @Override
    public void init() throws ServletException {
        super.init();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new ServletException("MySQL JDBC Driver not found.", e);
        }
    }

    // =========================================================
    // CORS
    // =========================================================

    private void setCorsHeaders(HttpServletRequest request,
                                HttpServletResponse response) {

        String origin = request.getHeader("Origin");

        // Vite development server
        if ("http://localhost:5173".equals(origin)
                || "http://127.0.0.1:5173".equals(origin)) {

            response.setHeader("Access-Control-Allow-Origin", origin);
            response.setHeader("Vary", "Origin");
        }

        response.setHeader(
                "Access-Control-Allow-Methods",
                "GET, POST, PUT, DELETE, OPTIONS"
        );

        response.setHeader(
                "Access-Control-Allow-Headers",
                "Content-Type, Authorization"
        );

        response.setHeader(
                "Access-Control-Max-Age",
                "3600"
        );
    }

    @Override
    protected void doOptions(HttpServletRequest request,
                             HttpServletResponse response)
            throws IOException {

        setCorsHeaders(request, response);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    // =========================================================
    // GET
    // =========================================================

    @Override
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException {

        setCorsHeaders(request, response);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String action = request.getParameter("action");

        try (Connection conn = getConnection()) {

            if ("cars".equals(action)) {
                sendCars(conn, response);

            } else if ("evcars".equals(action)) {
                sendEvCars(conn, response);

            } else if ("contacts".equals(action)) {
                sendContacts(conn, response);

            } else if ("services".equals(action)) {
                sendServices(conn, response);

            } else if ("testdrives".equals(action)) {
                sendTestDrives(conn, response);

            } else {

                Map<String, Object> result = new LinkedHashMap<>();

                result.put("cars", getCars(conn));
                result.put("evcars", getEvCars(conn));
                result.put("contacts", getContacts(conn));
                result.put("services", getServices(conn));
                result.put("testdrives", getTestDrives(conn));

                sendJson(response, result);
            }

        } catch (Exception e) {
            sendError(response, e.getMessage());
        }
    }

    // =========================================================
    // POST
    // =========================================================

    @Override
    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {

        setCorsHeaders(request, response);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String action = request.getParameter("action");

        try (Connection conn = getConnection()) {

            Map<String, Object> data = readJson(request);

            if ("car".equals(action)) {
                insertCar(conn, data);

            } else if ("evcar".equals(action)) {
                insertEvCar(conn, data);

            } else {

                sendError(response, "Invalid POST action.");
                return;
            }

            sendSuccess(response, "Record inserted successfully.");

        } catch (Exception e) {
            sendError(response, e.getMessage());
        }
    }

    // =========================================================
    // PUT
    // =========================================================

    @Override
    protected void doPut(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException {

        setCorsHeaders(request, response);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String action = request.getParameter("action");

        try (Connection conn = getConnection()) {

            Map<String, Object> data = readJson(request);

            if ("car".equals(action)) {
                updateCar(conn, data);

            } else if ("evcar".equals(action)) {
                updateEvCar(conn, data);

            } else {

                sendError(response, "Invalid PUT action.");
                return;
            }

            sendSuccess(response, "Record updated successfully.");

        } catch (Exception e) {
            sendError(response, e.getMessage());
        }
    }

    // =========================================================
    // DELETE
    // =========================================================

    @Override
    protected void doDelete(HttpServletRequest request,
                            HttpServletResponse response)
            throws ServletException, IOException {

        setCorsHeaders(request, response);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String action = request.getParameter("action");
        String idString = request.getParameter("id");

        if (idString == null) {
            sendError(response, "ID is required.");
            return;
        }

        try (Connection conn = getConnection()) {

            int id = Integer.parseInt(idString);

            if ("car".equals(action)) {
                deleteRecord(conn, "cars_details", id);

            } else if ("evcar".equals(action)) {
                deleteRecord(conn, "ev_car_details", id);

            } else if ("contact".equals(action)) {
                deleteRecord(conn, "contact_inquiries", id);

            } else if ("service".equals(action)) {
                deleteRecord(conn, "service_bookings", id);

            } else if ("testdrive".equals(action)) {
                deleteRecord(conn, "test_drive_bookings", id);

            } else {
                sendError(response, "Invalid DELETE action.");
                return;
            }

            sendSuccess(response, "Record deleted successfully.");

        } catch (Exception e) {
            sendError(response, e.getMessage());
        }
    }

    // =========================================================
    // DATABASE CONNECTION
    // =========================================================

    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(
                DB_URL,
                DB_USER,
                DB_PASSWORD
        );
    }

    // =========================================================
    // CARS
    // =========================================================

    private List<Map<String, Object>> getCars(Connection conn)
            throws SQLException {

        String sql = "SELECT * FROM cars_details ORDER BY id DESC";

        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            List<Map<String, Object>> list = new ArrayList<>();

            while (rs.next()) {

                Map<String, Object> car = new LinkedHashMap<>();

                car.put("id", rs.getInt("id"));
                car.put("name", rs.getString("name"));
                car.put("type", rs.getString("type"));
                car.put("tagline", rs.getString("tagline"));
                car.put("price", rs.getDouble("price"));
                car.put("rangeOrMileage",
                        rs.getInt("rangeOrMileage"));
                car.put("safetyRating",
                        rs.getInt("safetyRating"));
                car.put("fuelType", rs.getString("fuelType"));
                car.put("imageUrl", rs.getString("imageUrl"));
                car.put("popular", rs.getBoolean("popular"));

                list.add(car);
            }

            return list;
        }
    }

    private void sendCars(Connection conn,
                          HttpServletResponse response)
            throws IOException, SQLException {

        sendJson(response, getCars(conn));
    }

    private void insertCar(Connection conn,
                           Map<String, Object> data)
            throws SQLException {

        String sql =
                "INSERT INTO cars_details " +
                "(name,type,tagline,price,rangeOrMileage," +
                "safetyRating,fuelType,imageUrl,popular) " +
                "VALUES (?,?,?,?,?,?,?,?,?)";

        try (PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, stringValue(data, "name"));
            ps.setString(2, stringValue(data, "type"));
            ps.setString(3, stringValue(data, "tagline"));
            ps.setDouble(4, doubleValue(data, "price"));
            ps.setInt(5,
                    intValue(data, "rangeOrMileage"));
            ps.setInt(6,
                    intValue(data, "safetyRating"));
            ps.setString(7,
                    stringValue(data, "fuelType"));
            ps.setString(8,
                    stringValue(data, "imageUrl"));
            ps.setBoolean(9,
                    booleanValue(data, "popular"));

            ps.executeUpdate();
        }
    }

    private void updateCar(Connection conn,
                           Map<String, Object> data)
            throws SQLException {

        int id = intValue(data, "id");

        String sql =
                "UPDATE cars_details SET " +
                "name=?, type=?, tagline=?, price=?, " +
                "rangeOrMileage=?, safetyRating=?, " +
                "fuelType=?, imageUrl=?, popular=? " +
                "WHERE id=?";

        try (PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, stringValue(data, "name"));
            ps.setString(2, stringValue(data, "type"));
            ps.setString(3, stringValue(data, "tagline"));
            ps.setDouble(4, doubleValue(data, "price"));
            ps.setInt(5,
                    intValue(data, "rangeOrMileage"));
            ps.setInt(6,
                    intValue(data, "safetyRating"));
            ps.setString(7,
                    stringValue(data, "fuelType"));
            ps.setString(8,
                    stringValue(data, "imageUrl"));
            ps.setBoolean(9,
                    booleanValue(data, "popular"));
            ps.setInt(10, id);

            ps.executeUpdate();
        }
    }

    // =========================================================
    // EV CARS
    // =========================================================

    private List<Map<String, Object>> getEvCars(Connection conn)
            throws SQLException {

        String sql = "SELECT * FROM ev_car_details ORDER BY id DESC";

        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            List<Map<String, Object>> list = new ArrayList<>();

            while (rs.next()) {

                Map<String, Object> car = new LinkedHashMap<>();

                car.put("id", rs.getInt("id"));
                car.put("name", rs.getString("name"));
                car.put("tagline", rs.getString("tagline"));
                car.put("price", rs.getDouble("price"));
                car.put("claimedrange",
                        rs.getInt("claimedrange"));
                car.put("batterycapacity",
                        rs.getInt("batterycapacity"));
                car.put("fastchargertime",
                        rs.getInt("fastchargertime"));
                car.put("imageurl",
                        rs.getString("imageurl"));
                car.put("warranty",
                        rs.getFloat("warranty"));

                list.add(car);
            }

            return list;
        }
    }

    private void sendEvCars(Connection conn,
                            HttpServletResponse response)
            throws IOException, SQLException {

        sendJson(response, getEvCars(conn));
    }

    private void insertEvCar(Connection conn,
                             Map<String, Object> data)
            throws SQLException {

        String sql =
                "INSERT INTO ev_car_details " +
                "(name,tagline,price,claimedrange," +
                "batterycapacity,fastchargertime,imageurl,warranty) " +
                "VALUES (?,?,?,?,?,?,?,?)";

        try (PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1,
                    stringValue(data, "name"));
            ps.setString(2,
                    stringValue(data, "tagline"));
            ps.setDouble(3,
                    doubleValue(data, "price"));
            ps.setInt(4,
                    intValue(data, "claimedrange"));
            ps.setInt(5,
                    intValue(data, "batterycapacity"));
            ps.setInt(6,
                    intValue(data, "fastchargertime"));
            ps.setString(7,
                    stringValue(data, "imageurl"));
            ps.setFloat(8,
                    floatValue(data, "warranty"));

            ps.executeUpdate();
        }
    }

    private void updateEvCar(Connection conn,
                             Map<String, Object> data)
            throws SQLException {

        int id = intValue(data, "id");

        String sql =
                "UPDATE ev_car_details SET " +
                "name=?, tagline=?, price=?, claimedrange=?, " +
                "batterycapacity=?, fastchargertime=?, " +
                "imageurl=?, warranty=? " +
                "WHERE id=?";

        try (PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1,
                    stringValue(data, "name"));
            ps.setString(2,
                    stringValue(data, "tagline"));
            ps.setDouble(3,
                    doubleValue(data, "price"));
            ps.setInt(4,
                    intValue(data, "claimedrange"));
            ps.setInt(5,
                    intValue(data, "batterycapacity"));
            ps.setInt(6,
                    intValue(data, "fastchargertime"));
            ps.setString(7,
                    stringValue(data, "imageurl"));
            ps.setFloat(8,
                    floatValue(data, "warranty"));
            ps.setInt(9, id);

            ps.executeUpdate();
        }
    }

    // =========================================================
    // CONTACT INQUIRIES
    // =========================================================

    private List<Map<String, Object>> getContacts(Connection conn)
            throws SQLException {

        String sql =
                "SELECT * FROM contact_inquiries " +
                "ORDER BY id DESC";

        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            List<Map<String, Object>> list = new ArrayList<>();

            while (rs.next()) {

                Map<String, Object> row = new LinkedHashMap<>();

                row.put("id", rs.getInt("id"));
                row.put("name", rs.getString("name"));
                row.put("email", rs.getString("email"));
                row.put("phone", rs.getString("phone"));
                row.put("subject", rs.getString("subject"));
                row.put("message", rs.getString("message"));
                row.put("submitted_at",
                        rs.getTimestamp("submitted_at"));

                list.add(row);
            }

            return list;
        }
    }

    private void sendContacts(Connection conn,
                              HttpServletResponse response)
            throws IOException, SQLException {

        sendJson(response, getContacts(conn));
    }

    // =========================================================
    // SERVICE BOOKINGS
    // =========================================================

    private List<Map<String, Object>> getServices(Connection conn)
            throws SQLException {

        String sql =
                "SELECT * FROM service_bookings " +
                "ORDER BY id DESC";

        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            List<Map<String, Object>> list = new ArrayList<>();

            while (rs.next()) {

                Map<String, Object> row = new LinkedHashMap<>();

                row.put("id", rs.getInt("id"));
                row.put("customer_name",
                        rs.getString("customer_name"));
                row.put("phone",
                        rs.getString("phone"));
                row.put("car_model",
                        rs.getString("car_model"));
                row.put("service_type",
                        rs.getString("service_type"));
                row.put("preferred_date",
                        rs.getDate("preferred_date"));
                row.put("notes",
                        rs.getString("notes"));
                row.put("created_at",
                        rs.getTimestamp("created_at"));

                list.add(row);
            }

            return list;
        }
    }

    private void sendServices(Connection conn,
                              HttpServletResponse response)
            throws IOException, SQLException {

        sendJson(response, getServices(conn));
    }

    // =========================================================
    // TEST DRIVES
    // =========================================================

    private List<Map<String, Object>> getTestDrives(Connection conn)
            throws SQLException {

        String sql =
                "SELECT * FROM test_drive_bookings " +
                "ORDER BY id DESC";

        try (PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            List<Map<String, Object>> list = new ArrayList<>();

            while (rs.next()) {

                Map<String, Object> row = new LinkedHashMap<>();

                row.put("id", rs.getInt("id"));
                row.put("customer_name",
                        rs.getString("customer_name"));
                row.put("phone",
                        rs.getString("phone"));
                row.put("email",
                        rs.getString("email"));
                row.put("city",
                        rs.getString("city"));
                row.put("car_name",
                        rs.getString("car_name"));
                row.put("car_category",
                        rs.getString("car_category"));
                row.put("preferred_date",
                        rs.getDate("preferred_date"));
                row.put("preferred_slot",
                        rs.getString("preferred_slot"));
                row.put("test_drive_location",
                        rs.getString("test_drive_location"));
                row.put("created_at",
                        rs.getTimestamp("created_at"));

                list.add(row);
            }

            return list;
        }
    }

    private void sendTestDrives(Connection conn,
                                HttpServletResponse response)
            throws IOException, SQLException {

        sendJson(response, getTestDrives(conn));
    }

    // =========================================================
    // DELETE
    // =========================================================

    private void deleteRecord(Connection conn,
                              String table,
                              int id)
            throws SQLException {

        // Table names are hardcoded above.
        // No user-provided table name is directly used.
        String sql =
                "DELETE FROM " + table + " WHERE id=?";

        try (PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);
            ps.executeUpdate();
        }
    }

    // =========================================================
    // JSON HELPERS
    // =========================================================

    private Map<String, Object> readJson(
            HttpServletRequest request)
            throws IOException {

        StringBuilder body = new StringBuilder();

        try (BufferedReader reader =
                     request.getReader()) {

            String line;

            while ((line = reader.readLine()) != null) {
                body.append(line);
            }
        }

        return gson.fromJson(
                body.toString(),
                new TypeToken<Map<String, Object>>() {}.getType()
        );
    }

    private void sendJson(HttpServletResponse response,
                          Object data)
            throws IOException {

        response.getWriter().print(
                gson.toJson(data)
        );
    }

    private void sendSuccess(HttpServletResponse response,
                             String message)
            throws IOException {

        Map<String, Object> result =
                new LinkedHashMap<>();

        result.put("success", true);
        result.put("message", message);

        sendJson(response, result);
    }

    private void sendError(HttpServletResponse response,
                           String message)
            throws IOException {

        response.setStatus(
                HttpServletResponse.SC_INTERNAL_SERVER_ERROR
        );

        Map<String, Object> result =
                new LinkedHashMap<>();

        result.put("success", false);
        result.put("message", message);

        sendJson(response, result);
    }

    // =========================================================
    // VALUE HELPERS
    // =========================================================

    private String stringValue(Map<String, Object> data,
                               String key) {

        Object value = data.get(key);

        return value == null ? null : String.valueOf(value);
    }

    private int intValue(Map<String, Object> data,
                         String key) {

        Object value = data.get(key);

        if (value instanceof Number) {
            return ((Number) value).intValue();
        }

        return Integer.parseInt(String.valueOf(value));
    }

    private double doubleValue(Map<String, Object> data,
                               String key) {

        Object value = data.get(key);

        if (value instanceof Number) {
            return ((Number) value).doubleValue();
        }

        return Double.parseDouble(String.valueOf(value));
    }

    private float floatValue(Map<String, Object> data,
                             String key) {

        Object value = data.get(key);

        if (value instanceof Number) {
            return ((Number) value).floatValue();
        }

        return Float.parseFloat(String.valueOf(value));
    }

    private boolean booleanValue(Map<String, Object> data,
                                 String key) {

        Object value = data.get(key);

        if (value instanceof Boolean) {
            return (Boolean) value;
        }

        return Boolean.parseBoolean(
                String.valueOf(value)
        );
    }
}
