"use client";
import React, { useEffect, useState } from 'react';
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";

export default function DashboardClient() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store' });
        if (res.status === 401) {
          // Not authorized -> go to login
          window.location.href = '/login';
          return;
        }
        if (!res.ok) throw new Error('failed to fetch');
        const data = await res.json();
        if (mounted) setUser(data);
      } catch (e) {
        console.error('Error fetching /api/auth/me', e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchUser();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <Spinner animation="border" />
        <div>Loading dashboard…</div>
      </div>
    );
  }

  return (
    <div>
      <TopHeader />
      <Header />
      <HeadBar />
      <Container className="my-4">
        <Row>
          <Col md={8}>
            <Card>
              <Card.Body>
                <h2>Welcome, {user?.name || 'Guest'}</h2>
                <p>Your email: {user?.email || 'N/A'}</p>
                <p>This is the dashboard client component. Server-side auth already validated your session.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <h4>Account</h4>
                <form action="/api/auth/logout" method="POST">
                  <Button type="submit" variant="primary">Logout</Button>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
